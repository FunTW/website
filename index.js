abi=[{constant:!1,inputs:[{name:"candidate",type:"string"}],name:"voteForCandidate",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{inputs:[{name:"candidateNames",type:"string[]"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"candidateList",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"candidate",type:"string"}],name:"totalVotesFor",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"candidate",type:"string"}],name:"validCandidate",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"candidate",type:"string"}],name:"votesReceived",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"}];
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0xd387d31ce2df83086da90072af5980026a0b7c3a');
candidates = {'Alice': 'candidate-1', 'Bob': 'candidate-2', 'Candy': 'candidate-3'}

function voteForCandidate() {
  candidateName = $('#candidate').val();
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, 
    function() {

    });
}
loop=()=>{
  let candidateNames = Object.keys(candidates);
  for (let name of candidateNames) {
    let val = contractInstance.totalVotesFor.call(name,(e,result)=>{
      $(`#${candidates[name]}` ).html(result.c[0].toString());
    })
  }
  setTimeout(loop,1000);

}
loop()
