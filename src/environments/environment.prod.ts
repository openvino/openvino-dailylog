function getProvider(providers: string[]) {
  let index = Math.floor(Math.random() * providers.length)

  return providers[index];
}

export const environment = {
  production: true,
  providerUrl: getProvider([
    'https://mainnet.infura.io/v3/80311d26ccb74946b9d016f38ce901d2',
    'https://mainnet.infura.io/v3/781c281ea82347709935f5b394f2383c',
    'https://mainnet.infura.io/v3/6d7880a8f4b347ca8953d2715e164241',
  ]),
  apiUrl: 'https://costaflores.openvino.exchange',
  apiKey:"lK8KoFYW6ln0fUB8VoMqQkPyyOQVOWOnPN51vCGimzWACXFUy02uuRS7pLM91HoM",
  mapsApiKey:"AIzaSyC6t7EuOhDJf_B8gpafWNUnqNqoLvZy0jI",
  shippingAccount:"0xCe3759171B37D1B78280fD9472eB1aB9972A8205",
};