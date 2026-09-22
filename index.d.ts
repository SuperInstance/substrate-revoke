// substrate-revoke: type declarations for the REVOKE opcode (R10).

export interface ObservationLike {
  id: string;
  [key: string]: any;
}

export interface Revoker {
  id: string;
  [key: string]: any;
}

export interface RevocationScar {
  type: 'revocation';
  id: string;
  revokes: string;
  revoker: string;
  reason: string | null;
  time: number;
  is_supersession: true;
  was_observation: ObservationLike;
}

/**
 * Marks an observation as superseded but does not delete it. Scars persist.
 * Throws if the observation has no id or the revoker has no id.
 */
export declare function revoke(
  observation: ObservationLike,
  revoker: Revoker | string,
  reason?: string | null
): RevocationScar;
