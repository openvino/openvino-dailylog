function getProvider(providers: string[]) {
  let index = Math.floor(Math.random() * providers.length);

  return providers[index];
}

export const environment = {
  production: true,
  providerUrl: getProvider([
    "https://mainnet.infura.io/v3/cef28f8cc48644cdb133281c30a6d1d6",
  ]),
  apiUrl: "https://costaflores.openvino.exchange",
  apiKey: "eNqeAW5l1TifPMdmo7B5UIyRhjdmJwmTeakcHZr0SiZ5Z6ByJElQ1S3fuEqaMiZZ",
  mapsApiKey: "AIzaSyC6t7EuOhDJf_B8gpafWNUnqNqoLvZy0jI",
  shippingAccount: "0xe613FAF5fA44f019E3A3AF5927bAA6B13643BA53",
  tcr_address: '0xba0304273a54dfec1fc7f4bccbf4b15519aecf15'

};
