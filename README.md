# LazyAnime

LazyAnime is an anime information display project that aims to bring together the rich and dynamic data of AniList 2.0 using GraphQL API. Its design inspiration is taken from popular streaming websites and it integrates the role-based permissions controlled by Discord roles. It leverages `next-auth` for robust, secure and straightforward authentication.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Planned Additions](#planned-additions)

## Features

- Full integration with AniList 2.0's GraphQL API for a robust set of anime data.
- Inspired by popular streaming website design for an intuitive and familiar user interface.
- Permissions are controlled by Discord roles for a manageable and secure user experience.
- Authentication powered by `next-auth`, adding a layer of security and ease of use.

## Installation

```sh
# Clone the repository
git clone https://github.com/username/lazyanime.git

# Move into the new directory
cd lazyanime

# Install dependencies
yarn install
```

Replace username with your GitHub username.

## Usage

Replace the values in the `.env.example` file. `NEXTAUTH_SECRET` and `NEXTAUTH_URL` are required if you want to use bare-minimum auth. `DISCORD_SERVER_ID` and 

`DISCORD_ENTRY_ROLE` are required if you want to use Discord role entry. Users must have the `roleID` in that server in order to log in.

Before running the application, make sure to set up the environment variables correctly for AniList 2.0 GraphQL API, Discord roles and `next-auth`. Check `.env.example` for the required environment variables.

```sh
# Run the application
yarn start
```

## Planned Additions

- Re-integration of [consumet](https://github.com/consumet/consumet.ts) as a source for HTTP streaming anime. We believe this will significantly expand the range and versatility of content available to LazyAnime users.

- Addition of Keyboard bindings - specifically "ctrl + k" and "/" to activate search. This is in line with our continuous effort to improve user interaction and provide more fluid navigation around the platform.

