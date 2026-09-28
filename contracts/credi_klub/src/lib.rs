#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, Symbol};

#[derive(Clone)]
#[soroban_sdk::contracttype]
pub struct Pool {
    pub borrower: Address,
    pub principal: i128,
    pub funded: i128,
    pub fee_bps: u32,
    pub active: bool,
}

#[contract]
pub struct CrediKlub;

#[contractimpl]
impl CrediKlub {
    pub fn create_pool(env: Env, borrower: Address, principal: i128, fee_bps: u32) -> u32 {
        borrower.require_auth();
        assert!(principal > 0 && fee_bps <= 2_000);
        let id: u32 = env.storage().instance().get(&Symbol::new(&env, "next_id")).unwrap_or(0);
        env.storage().instance().set(&Symbol::new(&env, "next_id"), &(id + 1));
        let pool = Pool { borrower, principal, funded: 0, fee_bps, active: true };
        env.storage().persistent().set(&id, &pool);
        id
    }

    pub fn contribute(env: Env, pool_id: u32, lender: Address, amount: i128) {
        lender.require_auth();
        assert!(amount == 10_000_000); // $100 MXN in the selected MXN asset precision.
        let mut pool: Pool = env.storage().persistent().get(&pool_id).unwrap();
        assert!(pool.active && pool.funded + amount <= pool.principal);
        pool.funded += amount;
        env.storage().persistent().set(&pool_id, &pool);
        if pool.funded == pool.principal { Self::drawdown(env, pool_id); }
    }

    pub fn drawdown(env: Env, pool_id: u32) {
        let mut pool: Pool = env.storage().persistent().get(&pool_id).unwrap();
        assert!(pool.active && pool.funded == pool.principal);
        // Production implementation invokes the regulated asset token transfer here.
        pool.active = true;
        env.storage().persistent().set(&pool_id, &pool);
    }

    pub fn distribute_repayment(env: Env, pool_id: u32, repayment: i128) {
        let mut pool: Pool = env.storage().persistent().get(&pool_id).unwrap();
        assert!(repayment >= pool.principal);
        let fee = repayment - pool.principal;
        let lenders = fee * 8 / 20; // Level 1: 8% to lenders.
        let protection = fee * 7 / 20; // 7% to protection fund.
        let treasury = fee - lenders - protection; // 5% to RWA treasury.
        let _ = (lenders, protection, treasury);
        pool.active = false;
        env.storage().persistent().set(&pool_id, &pool);
        env.events().publish((Symbol::new(&env, "repaid"), pool_id), repayment);
    }
}

