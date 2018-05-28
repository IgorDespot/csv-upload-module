const valueCheck = require('../../default-rules-value-check');

const Transaction = {
  id: valueCheck.mandatoryCheck,
  type: String,
  refEmitter: valueCheck.mandatoryCheck,
  refReceiver: valueCheck.mandatoryCheck,
  refCapturer: String,
  date: valueCheck.dateCheck,
  refTransferredResources: valueCheck.mandatoryCheck,
  transferredLoad: valueCheck.commaNumToUnits
};

module.exports = Transaction;
