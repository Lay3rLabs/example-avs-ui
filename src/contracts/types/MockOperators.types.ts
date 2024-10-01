/* eslint-disable @typescript-eslint/no-empty-object-type */
/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.11.1.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export interface InstantiateMsg {
  operators: InstantiateOperator[];
}
export interface InstantiateOperator {
  addr: string;
  voting_power: number;
}
export type ExecuteMsg = string;
export type QueryMsg = {
  voting_power_at_height: {
    address: string;
    height?: number | null;
  };
} | {
  total_power_at_height: {
    height?: number | null;
  };
} | {
  all_voters: {};
};
export type Uint128 = string;
export interface AllVotersResponse {
  voters: VoterInfo[];
}
export interface VoterInfo {
  address: string;
  power: Uint128;
}
export interface TotalPowerResponse {
  height: number;
  power: Uint128;
}
export interface VotingPowerResponse {
  height: number;
  power: Uint128;
}
