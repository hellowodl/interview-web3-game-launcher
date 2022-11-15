# Web3 Game Launcher

A game launcher with Web3 integration that mints an NFT the first time a game is launched.
Made for a skill assessment for a company's hiring process.
The contract which the app interacts with can be found [here](https://goerli.etherscan.io/address/0x03A3ae807AD2eB94fC11786Eea8d4f2C7395486B) and it's type definitions [here](https://github.com/hellowodl/interview-contracts).

## Requirements

 - A wallet with a bit of Goerli test ETH(can be gathered [here](https://goerlifaucet.com/) or [here](https://goerli-faucet.pk910.de/))
 - Steam([@equal-games/game-scanner](https://github.com/EqualGames/game-scanner) is used to scan for games)
 - Windows/MacOS(soz, in the limited time I had for this assessment I didn't get the chance to build something custom for Linux)
 - PNPM(haven't tested it with yarn nor npm)

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm run dev
```

### Build

Run production build
```bash
$ pnpm run start
```

Build for specific targets
```bash
# For windows
$ pnpm run build:win

# For macOS
$ pnpm run build:mac

# For Linux
$ pnpm run build:linux
```
