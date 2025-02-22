export type Contract = {
  address: string
  abi: string
}

export type Token = Contract & {
  name: string
  symbol: string
}

export type Project = {
  name: string
  description: string
  video?: string
  image?: string
  lungta?: LungtaModel
  leader: Link
  sourceCodes?: Array<Link>
  show: {
    test?: Link
    production?: Link
  }
  smartcontracts: {
    DaoToken: {
      [key: string]: Contract
    }
    CheckToken: {
      [key: string]: Contract
    }
    MainToken: {
      [key: string]: Contract
    }
    Minter?: {
      [key: string]: Contract
    }
    Collaterals?: {
      [key: string]: Array<Token>
    }
  }
  checkProjectParams: { [key: number]: CheckProjectParams }
}

export type Link = {
  title: string
  link: string
}

export type LungtaModel = {
  logos: Link
  aurora: Link
  maydone: Link
  act: Link
  sangha: Link
}

export type CheckProjectParams = {
  maintainer?: string
  amount?: bigint
  period?: number
  startTime?: number
  minted?: bigint
  limit?: bigint
  cancelled?: boolean
  description?: string // above params are fetched from the smartcontract
  lungta?: LungtaModel
}

export const FrogWars: Project = {
  name: 'Frog Wars',
  description: 'Frog Wars is the fighting game with the Mad Frogs NFTs.',
  video: 'https://maydone.ara.foundation/FrogWars.mp4',
  leader: {
    title: 'Medet Ahmetson',
    link: 'https://forum.ara.foundation/u/ahmetson',
  },
  sourceCodes: [
    {
      title: 'Game source code',
      link: 'https://github.com/ahmetson/frogwarsgame',
    },
    {
      title: 'Smartcontracts',
      link: 'https://github.com/ahmetson/frogwars-smartcontracts',
    },
  ],
  show: {
    test: {
      title: 'Play game on official website',
      link: 'https://game.frog-wars.com',
    },
  },
  smartcontracts: {
    DaoToken: {
      59144: {
        address: '0x889400fb9bde04bfdf353cc718fed3d6ddcf735f',
        abi: 'araTokenAbi',
      },
    },
    CheckToken: {
      59144: {
        address: '0x1cEB3c60e2E74D6FDDAcDFEE23b8f2C91BBB6996',
        abi: 'projectCheckTokenAbi',
      },
    },
    MainToken: {
      59144: {
        address: '0x6921482cEf17ecd8382A96B4e6E3749a9B6fcFd0',
        abi: 'projectMainTokenAbi',
      },
    },
    // Minter: {},
    Collaterals: {
      59144: [
        {
          address: '0x889400fB9BDE04BFdf353cC718fED3d6dDcF735F',
          abi: 'araTokenAbi',
          name: 'frogwifcat',
          symbol: 'WEF',
        },
        {
          address: '0x176211869ca2b568f2a7d4ee941e073a821ee1ff',
          abi: 'araTokenAbi',
          name: 'USDC',
          symbol: 'USDC',
        },
      ],
    },
  },
  checkProjectParams: {
    1: {
      description: 'Implement a multiplayer game for Crystal token',
      lungta: {
        logos: {
          title: 'Frog Wars - a fighting game',
          link: 'https://forum.ara.foundation/d/16-frog-wars-a-fighting-game',
        },
        aurora: {
          title: 'Frog Wars - a fighting game proposal',
          link: 'https://forum.ara.foundation/d/19-frog-wars-a-fighting-game-proposal',
        },
        maydone: {
          title: 'Frog Wars on Maydone Launchpad',
          link: 'https://maydone.ara.foundation/projects/frog-wars',
        },
        act: {
          title: 'Frog Wars development progress',
          link: 'https://forum.ara.foundation/d/29-frog-wars-development-progress',
        },
        sangha: {
          title: 'Dao.FrogWifCat',
          link: 'https://dao.frogwifcat.com/',
        },
      },
    },
  },
}

export const ARA_CHECK_PROJECT_LIMIT = 2592000

export const Ara: Project = {
  name: 'Ara',
  description: 'Ara development.',
  image: 'https://maydone.ara.foundation/ara_screen.png',
  leader: {
    title: 'Medet Ahmetson',
    link: 'https://forum.ara.foundation/u/ahmetson',
  },
  sourceCodes: [
    {
      title: 'Organization',
      link: 'https://github.com/ara-foundation',
    },
  ],
  show: {
    test: {
      title: 'Forum where everything goes on',
      link: 'https://forum.ara.foundation',
    },
    production: {
      title: 'Official website of Ara',
      link: 'https://ara.foundation',
    },
  },
  lungta: {
    logos: {
      title: 'Ara',
      link: 'https://forum.ara.foundation/d/31-ara-idea',
    },
    aurora: {
      title: 'Ara proposal',
      link: 'https://forum.ara.foundation/d/32-ara-proposal',
    },
    maydone: {
      title: 'Ara page on Launchpad',
      link: 'https://maydone.ara.foundation/projects/ara',
    },
    act: {
      title: 'Ara progress',
      link: 'https://forum.ara.foundation/d/33-ara-progress',
    },
    sangha: {
      title: 'Ara Government',
      link: 'https://forum.ara.foundation/d/34-ara-government',
    },
  },
  smartcontracts: {
    DaoToken: {
      8453: {
        // Base Network
        address: '0x040eEE6D8da3092381Bc9DFaB8fD4A0A9D8eEBDa',
        abi: 'araTokenAbi',
      },
    },
    CheckToken: {
      8453: {
        address: '0x9C0aCC45CEcB50444c0Ce3f29e822fEFF64ff401',
        abi: 'checkTokenAbi',
      },
    },
    MainToken: {
      8453: {
        address: '0x58035DC04D0c05b43396a2d7436F87E5C9F380f6',
        abi: 'mainTokenAbi',
      },
    },
    Minter: {
      8453: {
        address: '0x2470aEf262166d338788Fef932dCeCCfdDC60206',
        abi: 'minterAbi',
      },
    },
    Collaterals: {
      8453: [
        {
          address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
          abi: 'araTokenAbi',
          name: 'Circle USD',
          symbol: 'USDC',
        },
        {
          address: '0x0000000000000000000000000000000000000000',
          abi: 'noAbi',
          name: 'Ethereum',
          symbol: 'ETH',
        },
      ],
    },
  },
  checkProjectParams: {
    1: {
      description: 'Testing with 50 CHECK',
    },
    2: {
      description: 'Ara Landing Page',
      lungta: {
        logos: {
          title: 'Ara Landing Page',
          link: 'https://forum.ara.foundation/d/12-ara-landing-page-idea',
        },
        aurora: {
          title: 'Ara landing page proposal',
          link: 'https://forum.ara.foundation/d/17-aras-landing-page-proposal/2',
        },
        maydone: {
          title: 'Ara on launchpad',
          link: 'https://maydone.ara.foundation/projects/ara',
        },
        act: {
          title: 'Ara landing page progress',
          link: 'https://forum.ara.foundation/d/18-ara-landing-page-development',
        },
        sangha: {
          title: 'Ara Government',
          link: 'https://forum.ara.foundation/d/34-ara-government',
        },
      },
    },
    3: {
      description: 'Ara MVP',
      lungta: {
        logos: {
          title: 'Ara Landing Page',
          link: 'https://forum.ara.foundation/d/12-ara-landing-page-idea',
        },
        aurora: {
          title: 'Ara landing page proposal',
          link: 'https://forum.ara.foundation/d/17-aras-landing-page-proposal/2',
        },
        maydone: {
          title: 'Ara on launchpad',
          link: 'https://maydone.ara.foundation/projects/ara',
        },
        act: {
          title: 'Ara landing page progress',
          link: 'https://forum.ara.foundation/d/18-ara-landing-page-development',
        },
        sangha: {
          title: 'Ara Government',
          link: 'https://forum.ara.foundation/d/34-ara-government',
        },
      },
    },
  },
}

export const Projects = [Ara, FrogWars]
