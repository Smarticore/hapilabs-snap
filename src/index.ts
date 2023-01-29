import { OnTransactionHandler } from "@metamask/snap-types";

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {

  // Get tx data
  const user_address = transaction.from;
  const contract_address =  transaction.to;
  const chain_id =  chainId.split(":")[1];

  const url = 'https://research.hapilabs.one/v1/snap/'+contract_address+'/'+chain_id+'/'+user_address;
  let x = await fetch(url);
  let data = await x.json();
  console.log(data);

  // Cases for returning insights
  if (data.status == "ok"){
    return {
      insights: {"Risk Score": data.data.risk.score, "Risk category": data.data.risk.category, "Type": data.data.type, "Public name": data.data.public_name, "Contract security": data.data.contract, "Token security": data.data.token},
    };
  } else if(data.status =='error'){
    return {
      insights: {"Error": data.description},
    };
  } else {
    return {
      insights: {"Unknown Error": "An unknown error occured. Please contact the team and try again later."},
    };
  }
};