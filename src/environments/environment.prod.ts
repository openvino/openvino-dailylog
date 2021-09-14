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
  apiKey: "eNqeAW5l1TifPMdmo7B5UIyRhjdmJwmTeakcHZr0SiZ5Z6ByJElQ1S3fuEqaMiZZ",
  mapsApiKey:"AIzaSyC6t7EuOhDJf_B8gpafWNUnqNqoLvZy0jI",
  shippingAccount:"0xe613FAF5fA44f019E3A3AF5927bAA6B13643BA53",
};