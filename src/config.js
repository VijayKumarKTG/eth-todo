export const TODO_LIST_ADDRESS = '0x0Dc538D60B460Dd2ff555B4C7094A5F921142445';
export const TODO_LIST_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'tasks',
    outputs: [
      {
        name: 'id',
        type: 'uint256',
      },
      {
        name: 'content',
        type: 'string',
      },
      {
        name: 'completed',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x8d977672',
  },
  {
    constant: true,
    inputs: [],
    name: 'taskCount',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0xb6cb58a5',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'content',
        type: 'string',
      },
      {
        indexed: false,
        name: 'completed',
        type: 'bool',
      },
    ],
    name: 'TaskCreated',
    type: 'event',
    signature:
      '0x05d0fb833127fc08168556d0e7ca9554fc3f6bc843b3b7d2bf1c35aea6bab660',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'completed',
        type: 'bool',
      },
    ],
    name: 'TaskCompleted',
    type: 'event',
    signature:
      '0xe21fa966ca5cd02748c0752352d18c48165e61cb55b4c29cccf924b5a95fcff1',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_content',
        type: 'string',
      },
    ],
    name: 'createTask',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x111002aa',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'toggleCompleted',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x455f5024',
  },
];
