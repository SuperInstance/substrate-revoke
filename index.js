// substrate-revoke: REVOKE opcode
// REVOKE(obs) -> superseded_obs
// Marks an observation as superseded but does not delete it. Scars persist.

const { fnv1a64Hex } = require('@superinstance/observation-primitive');

function revoke(observation, revoker, reason) {
  if (!observation?.id) throw new Error('revoke requires observation with id');
  if (!revoker?.id && typeof revoker !== 'string') {
    throw new Error('revoke requires revoker with id');
  }
  const revokerId = typeof revoker === 'string' ? revoker : revoker.id;
  const time = Date.now();

  const scar = {
    type: 'revocation',
    id: fnv1a64Hex(JSON.stringify({
      o: observation.id,
      r: revokerId,
      s: reason || null,
      t: time,
    })),
    revokes: observation.id,
    revoker: revokerId,
    reason: reason || null,
    time,
    is_supersession: true, // the obs is superseded, not deleted
    was_observation: observation,
  };

  return scar;
}

module.exports = { revoke };
