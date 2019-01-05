require('dotenv-flow').config()

const { Prisma } = require('prisma-binding')
const randomize = require('randomatic')

const db = new Prisma({
  typeDefs: process.env.PRISMA_SCHEMA || 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  debug: process.env.PRISMA_DEBUG,
  secret: process.env.PRISMA_SECRET
})

const usersData = [
  {
    email: 'admin@admin.com',
    password: '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', // plaintext password: "nooneknows"
    name: 'admin',
    roles: {
      set: ['ADMIN']
    }
  },
  {
    email: 'user@user.com',
    password: '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', // plaintext password: "nooneknows"
    name: 'user',
    roles: {
      set: ['USER']
    }
  },
  {
    email: 'tester@tester.com',
    password: '$2a$10$hACwQ5/HQI6FhbIISOUVeusy3sKyUDhSq36fF5d/54aAdiygJPFzm', // plaintext password: "nooneknows"
    name: 'tester',
    roles: {
      set: ['TESTER']
    }
  }
]

const agentsData = [
  {
    name: 'Default Agent',
    description: 'Default Agent',
    capabilities: {}
  }
]

const apikeysData = [
  {
    name: 'Default Api Key',
    key: randomize('Aa0', 20)
  }
]

const deviceProvidersData = [
  {
    name: 'Local Selenium Server',
    type: 'LOCALSELENIUM'
  },
  {
    name: 'Integrated PhantomJS',
    type: 'INTEGRATED'
  },
  {
    name: 'Saucelabs.com',
    type: 'SAUCELABS',
    url: 'http://ondemand.saucelabs.com:80/wd/hub',
    username: 'YOUR_SAUCELABS_USERNAME',
    password: 'YOUR_SAUCELABS_ACCESS_KEY'
  }
]

const deviceSetsData = [
  {
    name: 'Integrated PhantomJS',
    description: 'Integrated PhantomJS (virtual browser)',
    tags: {
      set: [ 'PhantomJS', 'Integrated' ]
    },
    provider: {
      connect: {
        name: 'Integrated PhantomJS'
      }
    },
    devices: {
      create: [
        {
          name: 'PhantomJS Virtual Browser',
          type: 'DESKTOP',
          capabilities: JSON.stringify({ browserName: 'phantomjs' })
        }
      ]
    }
  },
  {
    name: 'Android Core Devices',
    description: 'Android Core Devices (S8 + Pixel, various versions)',
    tags: {
      set: [ 'Android', 'Saucelabs', 'Simulator' ]
    },
    provider: {
      connect: {
        name: 'Saucelabs.com'
      }
    },
    devices: {
      create: [
        {
          name: 'Samsung Galaxy S8 GoogleAPI Emulator, 7.0',
          type: 'MOBILEBROWSER',
          capabilities: '{"browserName":"Chrome","deviceName":"GalaxyS8GoogleAPI","platformName":"Android","platformVersion":"7.0"}'
        },
        {
          name: 'Google Pixel GoogleAPI Emulator, 7.0',
          type: 'MOBILEBROWSER',
          capabilities: '{"browserName":"Chrome","deviceName":"PixelGoogleAPI","platformName":"Android","platformVersion":"7.0"}'
        },
        {
          name: 'Samsung Galaxy S4 GoogleAPI Emulator, 4.4',
          type: 'MOBILEBROWSER',
          capabilities: '{"browserName":"Chrome","deviceName":"GalaxyS4GoogleAPI","platformName":"Android","platformVersion":"4.4"}'
        },
        {
          name: 'Samsung Galaxy S6 GoogleAPI Emulator, 7.0',
          type: 'MOBILEBROWSER',
          capabilities: '{"browserName":"Chrome","deviceName":"GalaxyS6GoogleAPI","platformName":"Android","platformVersion":"7.0"}'
        },
        {
          name: 'Google Pixel GoogleAPI Emulator, 7.1',
          type: 'MOBILEBROWSER',
          capabilities: '{"browserName":"Chrome","deviceName":"PixelGoogleAPI","platformName":"Android","platformVersion":"7.1"}'
        }
      ]
    }
  },
  {
    name: 'iOS Core Devices',
    description: 'iOS Core Devices (X, 7 Plus, SE)',
    tags: {
      set: [ 'iOS', 'Saucelabs', 'Simulator' ]
    },
    provider: {
      connect: {
        name: 'Saucelabs.com'
      }
    },
    devices: {
      create: [
        {
          name: 'iPhone X Simulator, 11.3',
          type: 'MOBILEBROWSER',
          capabilities: '{"browserName":"Safari","deviceName":"iPhone X","platformName":"iOS","platformVersion":"11.3"}'
        },
        {
          name: 'iPhone 7 Plus Simulator, 10.0',
          type: 'MOBILEBROWSER',
          capabilities: '{"browserName":"Safari","deviceName":"iPhone 7 Plus","platformName":"iOS","platformVersion":"10.0"}'
        },
        {
          name: 'iPhone SE Simulator, 10.0',
          type: 'MOBILEBROWSER',
          capabilities: '{"browserName":"Safari","deviceName":"iPhone SE","platformName":"iOS","platformVersion":"10.0"}'
        }
      ]
    }
  },
  {
    name: 'Latest Chrome on Desktop',
    description: 'Latest Chrome on Windows 10, Mac and Linux',
    tags: {
      set: [ 'Chrome', 'Saucelabs' ]
    },
    provider: {
      connect: {
        name: 'Saucelabs.com'
      }
    },
    devices: {
      create: [
        {
          name: 'Google Chrome 48, Linux',
          type: 'DESKTOP',
          capabilities: '{"browserName":"chrome","platform":"Linux","version":"48"}'
        },
        {
          name: 'Google Chrome 69, Mac 10.10',
          type: 'DESKTOP',
          capabilities: '{"browserName":"chrome","platform":"Mac 10.10","version":"69"}'
        },
        {
          name: 'Google Chrome 69, Windows 10',
          type: 'DESKTOP',
          capabilities: '{"browserName":"chrome","platform":"Windows 10","version":"69"}'
        }
      ]
    }
  },
  {
    name: 'Latest Firefox on Desktop',
    description: 'Latest Firefox (62 on Mac and Win10, 45 on Linux)',
    tags: {
      set: [ 'Firefox', 'Saucelabs' ]
    },
    provider: {
      connect: {
        name: 'Saucelabs.com'
      }
    },
    devices: {
      create: [
        {
          name: 'Firefox 62, Mac 10.11',
          type: 'DESKTOP',
          capabilities: '{"browserName":"firefox","platform":"Mac 10.11","version":"62"}'
        },
        {
          name: 'Firefox 62, Windows 10',
          type: 'DESKTOP',
          capabilities: '{"browserName":"firefox","platform":"Windows 10","version":"62"}'
        },
        {
          name: 'Firefox 45, Linux',
          type: 'DESKTOP',
          capabilities: '{"browserName":"firefox","platform":"Linux","version":"45"}'
        }
      ]
    }
  }
]

const chatbotsData = [
  {
    name: 'Echo Bot',
    description: "Chatbot simulator for evaluating Botium and Botium Box features. Sample commands: 'buttons', 'show me buttons', 'picture', 'show me a picture', 'card', 'show me a card'. Otherwise the input is echoed back.",
    capabilities: {
      create: [
        {
          name: 'CONTAINERMODE',
          type: 'STRING',
          stringValue: 'echo'
        }
      ]
    }
  }
]

const testsetData = [
  {
    name: 'Echo Sample',
    description: 'Just some basic sample scripts',
    tags: {
      set: [ 'Demo' ]
    },
    expandConvos: true,
    expandUtterancesToConvos: false,
    scripts: {
      create: [
        {
          name: 'give me picture',
          scriptType: 'SCRIPTING_TYPE_CONVO',
          script: 'give me picture\n\n#me\nHello, Bot!\n\n#bot\nYou said: Hello, Bot!\n\n#me\ngive me a picture\n\n#bot\nHere is a picture\nMEDIA http://www.botium.at/img/logo.png\n'
        },
        {
          name: 'give me buttons',
          scriptType: 'SCRIPTING_TYPE_CONVO',
          script: 'give me buttons\n\n#me\nHi Bot!\n\n#bot\nYou said: Hi Bot!\n\n#me\ngive me buttons\n\n#bot\nHere are some buttons\nBUTTONS First Button|Second Button\n'
        }
      ]
    }
  },
  {
    name: 'Smalltalk (EN)',
    description: 'Common Smalltalk Testset (how are you ? what is your name ? ...)',
    tags: {
      set: [ 'Demo' ]
    },
    expandConvos: false,
    expandUtterancesToConvos: true,
    expandUtterancesIncomprehension: 'INCOMPREHENSION',
    repositories: {
      create: [
        {
          name: 'Botium Utterances - Smalltalk',
          giturl: 'https://github.com/codeforequity-at/botium-utterances.git',
          gitbranch: 'master',
          gitdir: 'convos/smalltalk',
          globFilter: '**/*.en.utterances.txt'
        },
        {
          name: 'Botium Utterances - Shared',
          giturl: 'https://github.com/codeforequity-at/botium-utterances.git',
          gitbranch: 'master',
          gitdir: 'shared',
          globFilter: 'INCOMPREHENSION.en.utterances.txt'
        }
      ]
    }
  }
]

const settingsData = [
  {
    cleanupJobIntervalMinutes: 30,
    keepTestCaseSuccessScreenshotsDays: 10,
    keepTestCaseSuccessConversationDays: 10,
    keepTestCaseFailedScreenshotsDays: 60,
    keepTestCaseFailedConversationDays: 60
  }
]

async function createRecords (entityName, entities, queryFn, keyField, createFn) {
  let createdCount = 0
  for (const entityData of entities) {
    const query = { }
    if (keyField) {
      query.where = { [keyField]: entityData[keyField] }
    }
    const existingEntity = await queryFn(query)
    if (existingEntity && existingEntity.length > 0) {
      console.log(entityName + ' ' + (keyField && entityData[keyField]) + ' already existing, skipping.')
    } else {
      console.log('creating ' + entityName + ' ' + (keyField && entityData[keyField]))
      try {
        await createFn({ data: entityData })
        createdCount++
      } catch (err) {
        console.log('Error creating ' + entityName + ': ', err)
      }
    }
  }
  console.log('Created ' + createdCount + ' ' + entityName + '(s)')
}

(async () => {
  await createRecords('user', usersData, db.query.users, 'name', db.mutation.createUser)
  await createRecords('agent', agentsData, db.query.agents, 'name', db.mutation.createAgent)
  await createRecords('apikey', apikeysData, db.query.apiKeys, 'name', db.mutation.createApiKey)
  await createRecords('deviceprovider', deviceProvidersData, db.query.deviceProviders, 'name', db.mutation.createDeviceProvider)
  await createRecords('deviceset', deviceSetsData, db.query.deviceSets, 'name', db.mutation.createDeviceSet)
  await createRecords('chatbot', chatbotsData, db.query.chatbots, 'name', db.mutation.createChatbot)
  await createRecords('testset', testsetData, db.query.testSets, 'name', db.mutation.createTestSet)
  await createRecords('settings', settingsData, db.query.systemSettingses, null, db.mutation.createSystemSettings)
})()
