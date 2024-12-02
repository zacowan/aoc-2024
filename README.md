# 🎄 Advent of Code 2024

Solutions for [Advent of Code](https://adventofcode.com/)

## Setup

1. Install [Fast Node Manager](https://github.com/Schniz/fnm) or [Node Version Manager](https://github.com/nvm-sh/nvm).
2. Use the right version of Node:

```sh
fnm use
# or
nvm use
```

3. Install [pnpm](https://pnpm.io).
4. Install required dependencies:

```sh
pnpm i
```

5. ✅ You're ready to go!

## Usage

This project comes with scripts to make problem-solving fun.

### Scaffold a day

```sh
# example: `pnpm scaffold 1`
pnpm scaffold <day>

# output:
# Created empty example file "data/examples/01.txt"
# Created empty input file "data/inputs/01.txt"
# Created test file "src/solutions/01/01.test.ts"
# Created solution file "src/solutions/01/01.ts"
# ---
# 🎄 Type `pnpm solve 1` to run your solution.
```

Individual solutions live in the `./src/solutions/` directory as separate files. _Inputs_ and _examples_ live in the the `./data` directory.

Every solution has _tests_ referencing its _example_ file in `./data/examples`. Use these tests to develop and debug your solutions against the example input.

### Run solutions for a day

```sh
# example: `pnpm solve 01`
pnpm solve <day>

# output:
# Part One: 42
# Part Two: 42
```

The `solve` command runs your solution against real puzzle inputs from the `./data/inputs` directory.

### Run all tests

```sh
pnpm test
```

This just runs [vitest](https://vitest.dev) under-the-hood and supports all of the same CLI options at the vitest CLI.

### Lint code

```sh
pnpm lint
```

### Typecheck code

```sh
pnpm typecheck
```
