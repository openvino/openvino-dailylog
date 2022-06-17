import * as ethers from "ethers";

export const PARTY = {
  NONE: 0,
  REQUESTER: 1,
  CHALLENGER: 2,
};

export const DISPUTE_STATUS = {
  WAITING: 0,
  APPEALABLE: 1,
  SOLVED: 2,
};

export const CONTRACT_STATUS = {
  ABSENT: 0,
  REGISTERED: 1,
  REGISTRATION_REQUESTED: 2,
  REMOVAL_REQUESTED: 3,
};

export const STATUS_CODE = {
  REJECTED: 0,
  REGISTERED: 1,
  SUBMITTED: 2,
  REMOVAL_REQUESTED: 3,
  CHALLENGED: 4,
  CROWDFUNDING: 5,
  CROWDFUNDING_WINNER: 6,
  WAITING_ARBITRATOR: 7,
  PENDING_SUBMISSION: 8,
  PENDING_REMOVAL: 9,
  WAITING_ENFORCEMENT: 10,
};

export const STATUS_TEXT = {
  [STATUS_CODE.REJECTED]: "Rejected",
  [STATUS_CODE.REGISTERED]: "Registered",
  [STATUS_CODE.SUBMITTED]: "Submitted",
  [STATUS_CODE.REMOVAL_REQUESTED]: "Removing",
  [STATUS_CODE.CHALLENGED]: "Challenged",
  [STATUS_CODE.CROWDFUNDING]: "Crowdfunding",
  [STATUS_CODE.CROWDFUNDING_WINNER]: "Crowdfunding Winner",
  [STATUS_CODE.WAITING_ARBITRATOR]: "Waiting Arbitrator",
  [STATUS_CODE.PENDING_SUBMISSION]: "Pending Execution",
  [STATUS_CODE.PENDING_REMOVAL]: "Pending Execution",
  [STATUS_CODE.WAITING_ENFORCEMENT]: "Waiting enforcement",
};

export const STATUS_COLOR = {
  [STATUS_CODE.REJECTED]: "#efb6b6",
  [STATUS_CODE.REGISTERED]: "#b6d7a8",
  [STATUS_CODE.SUBMITTED]: "#96bee2",
  [STATUS_CODE.REMOVAL_REQUESTED]: "#efc4dc",
  [STATUS_CODE.CHALLENGED]: "#f9cb9c",
  [STATUS_CODE.CROWDFUNDING]: "#b4a7d6",
  [STATUS_CODE.CROWDFUNDING_WINNER]: "#9d52d6",
  [STATUS_CODE.WAITING_ARBITRATOR]: "#ea99ca",
  [STATUS_CODE.PENDING_SUBMISSION]: "#99e9ea",
  [STATUS_CODE.PENDING_REMOVAL]: "#eabe99",
  [STATUS_CODE.WAITING_ENFORCEMENT]: "#ead399",
};

export const SUBGRAPH_STATUS_TO_CODE = {
  Absent: 0,
  Registered: 1,
  RegistrationRequested: 2,
  ClearingRequested: 3,
};

export const REQUEST_TYPE_LABEL = {
  [CONTRACT_STATUS.REGISTRATION_REQUESTED]: "Submission",
  [CONTRACT_STATUS.REMOVAL_REQUESTED]: "Removal",
};

export const hasPendingRequest = (contractStatus: number) =>
  contractStatus === CONTRACT_STATUS.REGISTRATION_REQUESTED ||
  contractStatus === CONTRACT_STATUS.REMOVAL_REQUESTED;

export const getResultStatus = ({ ruling, requestType }: any) => {
  let status;
  if (requestType === CONTRACT_STATUS.REGISTRATION_REQUESTED)
    switch (ruling) {
      case PARTY.NONE:
      case PARTY.CHALLENGER:
        status = CONTRACT_STATUS.ABSENT;
        break;
      case PARTY.REQUESTER:
        status = CONTRACT_STATUS.REGISTERED;
        break;
      default:
        throw new Error("Unhandled ruling");
    }
  else
    switch (ruling) {
      case PARTY.NONE:
      case PARTY.CHALLENGER:
        status = CONTRACT_STATUS.REGISTERED;
        break;
      case PARTY.REQUESTER:
        status = CONTRACT_STATUS.ABSENT;
        break;
      default:
        throw new Error("Unhandled ruling");
    }
  return status;
};

export const getActionLabel = ({ statusCode, itemName = "item" }: any) => {
  switch (statusCode) {
    case STATUS_CODE.REJECTED:
      return `Resubmit ${itemName}`;
    case STATUS_CODE.REGISTERED:
      return `Remove ${itemName}`;
    case STATUS_CODE.SUBMITTED:
      return "Challenge submission";
    case STATUS_CODE.REMOVAL_REQUESTED:
      return "Challenge removal";
    case STATUS_CODE.CROWDFUNDING:
    case STATUS_CODE.CROWDFUNDING_WINNER:
      return "Contribute Fees";
    case STATUS_CODE.PENDING_SUBMISSION:
      return "Execute submission";
    case STATUS_CODE.PENDING_REMOVAL:
      return "Execute removal";
    case STATUS_CODE.CHALLENGED:
    case STATUS_CODE.WAITING_ARBITRATOR:
      return "Waiting Arbitrator";
    case STATUS_CODE.WAITING_ENFORCEMENT:
      return "Waiting Enforcement";
    default:
      throw new Error(`Unhandled status code ${statusCode}`);
  }
};

export const itemToStatusCode = (
  {
    status,
    disputed,
    submissionTime,
    disputeStatus,
    hasPaid,
    currentRuling,
    appealStart,
    appealEnd,
  }: any,
  timestamp: any,
  challengePeriodDuration: number
): number | void => {
  if (status === CONTRACT_STATUS.ABSENT) return STATUS_CODE.REJECTED;
  if (status === CONTRACT_STATUS.REGISTERED) return STATUS_CODE.REGISTERED;
  if (!disputed) {
    const challengePeriodEnd = submissionTime.add(challengePeriodDuration);
    if (timestamp.gt(challengePeriodEnd))
      if (status === CONTRACT_STATUS.REGISTRATION_REQUESTED)
        // The challenge period has passed.
        return STATUS_CODE.PENDING_SUBMISSION;
      else return STATUS_CODE.PENDING_REMOVAL;

    // Still in challenge period.
    if (status === CONTRACT_STATUS.REGISTRATION_REQUESTED)
      return STATUS_CODE.SUBMITTED;
    if (status === CONTRACT_STATUS.REMOVAL_REQUESTED)
      return STATUS_CODE.REMOVAL_REQUESTED;
  }

  if (disputeStatus === DISPUTE_STATUS.WAITING) return STATUS_CODE.CHALLENGED;
  if (disputeStatus === DISPUTE_STATUS.APPEALABLE) {
    if (
      appealStart.eq(ethers.BigNumber.from(0)) &&
      appealEnd.eq(ethers.BigNumber.from(0))
    )
      return STATUS_CODE.CROWDFUNDING; // Dispute is appealable but the arbitrator does not use appeal period.

    if (currentRuling === PARTY.NONE)
      if (timestamp.lte(appealEnd))
        // Arbitrator did not rule or refused to rule.
        return STATUS_CODE.CROWDFUNDING;
      else return STATUS_CODE.WAITING_ARBITRATOR;

    // Arbitrator gave a decisive ruling (i.e. Ruled in favor of either the requester or challenger).
    if (timestamp.gt(appealEnd)) return STATUS_CODE.WAITING_ARBITRATOR;
    const appealPeriodDuration = appealEnd.sub(appealStart);
    const appealHalfTime = appealStart.add(
      appealPeriodDuration.div(ethers.BigNumber.from(2))
    );
    if (timestamp.lt(appealHalfTime)) return STATUS_CODE.CROWDFUNDING; // In first half of appeal period

    // If the party that lost the previous round is not fully funded
    // before the end of the first half, the dispute is over
    // and awaits enforecement.
    const loser =
      currentRuling === PARTY.REQUESTER ? PARTY.CHALLENGER : PARTY.REQUESTER;
    if (hasPaid[loser]) return STATUS_CODE.CROWDFUNDING_WINNER;
    else return STATUS_CODE.WAITING_ENFORCEMENT;
  }
};
