import { IdentityAgent } from "./typescript";

const agent = new IdentityAgent();

agent.lookup(BigInt("10015")).then((value) => {
  value.forEach((deviceData) => {
    deviceData.credentialId.toHex();
  });
});
