# OpenvinoDailylog

This project implements the OpenVino Viniswap webpage.

## Getting started

To install the project's dependencies and start a local development server, run the following commands:
 - `npm install`: Install dependencies
 - `ng serve`: Opens a dev server that serves the project on `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Products displayed

It's posible to add/update/remove products that will be displayed on the select page.

To do so, the following must be updated:

### Assets

All the product related assets can be found in the `src/assets/images` folder. Each product has it's own subfolder, currently `mtb18 | mtb19 | mtb20`.

Each product must have 3 images:

 - `image.png`: Image of the bottle + token. It will be displayed in the selector page
 - `bottle.png`: Image of the bottle. Present in the Viniswap component
 - `token.svg`: Token coin image. Present in the Viniswap component

Additionally to the images, a new translation must be added for each language in the `src/assets/i18n` folder defining the literal associated to the redeem date.

Example:

```
{
    ...
    "product": {
        "redeem": {
            "18": "6 Mai 2021",
            "19": "6 Mai 2022",
            "20": "6 Mai 2023"
        }
    }
    ...
}
...
```

### Declare product

Each product must be declared in the `src/app/services/core.service.ts`. Each product needs the following attributes:
 - `id`: Identifier of the product. Used only internally.
 - `image`: Path to the `image.png` defined in the previous section
 - `bottleImage`: Path to the `bottle.png` defined in the previous section
 - `tokenIcon`: Path to the `token.svg` defined in the previous section
 - `crowdsaleAddress`: Address of the Crowdsale contract
 - `tokenAddress`: Address of the ERC20 token
 - `redeemDate`: Key of the translation associated with the one defined in the previous section
 - `year`: Product's release year


Example:

```
{
        id: 'MTB20',
        image: 'assets/images/mtb20/image.png',
        bottleImage: 'assets/images/mtb20/bottle.png',
        tokenIcon: 'assets/images/mtb20/token.svg',
        crowdsaleAddress: '0x5411bffa359fF9cEbA0ED275aC5F00aB3435cB47',
        tokenAddress: '0x6a2f414e1298264ecd446d6bb9da012760336a4f',
        redeemDate: "product.redeem.20",
        year: 2020
      }
```


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.