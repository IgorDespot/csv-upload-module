const valueCheck = require('../../default-rules-value-check');

const Transaction = {
  id: valueCheck.mandatoryCheck,
  type: String,
  refEmitter: valueCheck.mandatoryCheck,
  refReceiver: valueCheck.mandatoryCheck,
  refCapturer: String,
  date: String,
  refTransferredResources: valueCheck.mandatoryCheck,
  transferredLoad: valueCheck.commaNumToUnitsMandatory
};

module.exports = Transaction;
