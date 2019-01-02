pragma solidity ^0.4.25;
pragma experimental ABIEncoderV2;

// 智能合約的命名
contract Voting {
  // 儲存累積票數的狀態變數(key => value)
  mapping (bytes32 => uint8) private _votesReceived;

  // 儲存候選人名字的清單陣列
  string[] public candidateList;


  // 構造函數 初始化候選人名單
  constructor(string[] candidateNames) public {
    candidateList = candidateNames;
  }
  function votesReceived(string candidate) view public returns(uint8){
      return _votesReceived[keccak256(candidate)];
  }

  // 查詢某個候選人的總票數
  function totalVotesFor(string candidate)  view public returns (uint8) {
    require(validCandidate(candidate) == true);
    // 或者
    // assert(validCandidate(candidate) == true);
    return _votesReceived[keccak256(candidate)];
  }

  // 為某個候選人投票
  function voteForCandidate(string candidate) public {
    assert(validCandidate(candidate) == true);
    _votesReceived[keccak256(candidate)] += 1;
  }

  // 檢索投票的姓名是不是候選人的名字
  function validCandidate(string candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (keccak256(candidateList[i]) == keccak256(candidate)) {
        return true;
      }
    }
    return false;
  }
}