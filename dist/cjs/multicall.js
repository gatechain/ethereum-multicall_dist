'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.Multicall = void 0
var ethers_1 = require('ethers')
var utils_1 = require('ethers/lib/utils')
var enums_1 = require('./enums')
var utils_2 = require('./utils')
var Multicall = /** @class */ (function () {
  function Multicall(_options) {
    this._options = _options
    if (this._options.web3Instance) {
      this._executionType = enums_1.ExecutionType.web3
      return
    }
    if (this._options.ethersProvider) {
      this._executionType = enums_1.ExecutionType.ethers
      return
    }
    if (this._options.nodeUrl) {
      this._executionType = enums_1.ExecutionType.customHttp
      return
    }
    throw new Error(
      // tslint:disable-next-line: max-line-length
      'Your options passed in our incorrect they need to match either `MulticallOptionsEthers`, `MulticallOptionsWeb3` or `MulticallOptionsCustomJsonRpcProvider` interfaces'
    )
  }
  /**
   * Call all the contract calls in 1
   * @param calls The calls
   */
  Multicall.prototype.call = function (contractCallContexts, contractCallOptions) {
    if (contractCallOptions === void 0) {
      contractCallOptions = {}
    }
    return __awaiter(this, void 0, void 0, function () {
      var aggregateResponse,
        returnObject,
        response,
        contractCallsResults,
        originalContractCallContext,
        returnObjectResult,
        method,
        methodContext,
        originalContractCallMethodContext,
        outputTypes,
        decodedReturnValues
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!Array.isArray(contractCallContexts)) {
              contractCallContexts = [contractCallContexts]
            }
            return [
              4 /*yield*/,
              this.execute(this.buildAggregateCallContext(contractCallContexts), contractCallOptions),
            ]
          case 1:
            aggregateResponse = _a.sent()
            returnObject = {
              results: {},
              blockNumber: aggregateResponse.blockNumber,
            }
            for (response = 0; response < aggregateResponse.results.length; response++) {
              contractCallsResults = aggregateResponse.results[response]
              originalContractCallContext = contractCallContexts[contractCallsResults.contractContextIndex]
              returnObjectResult = {
                originalContractCallContext: utils_2.Utils.deepClone(originalContractCallContext),
                callsReturnContext: [],
              }
              for (method = 0; method < contractCallsResults.methodResults.length; method++) {
                methodContext = contractCallsResults.methodResults[method]
                originalContractCallMethodContext = originalContractCallContext.calls[methodContext.contractMethodIndex]
                outputTypes = this.findOutputTypesFromAbi(
                  originalContractCallContext.abi,
                  originalContractCallMethodContext.methodName
                )
                if (this._options.tryAggregate && !methodContext.result.success) {
                  returnObjectResult.callsReturnContext.push(
                    utils_2.Utils.deepClone({
                      returnValues: [],
                      decoded: false,
                      reference: originalContractCallMethodContext.reference,
                      methodName: originalContractCallMethodContext.methodName,
                      methodParameters: originalContractCallMethodContext.methodParameters,
                      success: false,
                    })
                  )
                  continue
                }
                if (outputTypes && outputTypes.length > 0) {
                  try {
                    decodedReturnValues = utils_1.defaultAbiCoder.decode(
                      // tslint:disable-next-line: no-any
                      outputTypes,
                      this.getReturnDataFromResult(methodContext.result)
                    )
                    returnObjectResult.callsReturnContext.push(
                      utils_2.Utils.deepClone({
                        returnValues: this.formatReturnValues(decodedReturnValues),
                        decoded: true,
                        reference: originalContractCallMethodContext.reference,
                        methodName: originalContractCallMethodContext.methodName,
                        methodParameters: originalContractCallMethodContext.methodParameters,
                        success: true,
                      })
                    )
                  } catch (e) {
                    if (!this._options.tryAggregate) {
                      throw e
                    }
                    returnObjectResult.callsReturnContext.push(
                      utils_2.Utils.deepClone({
                        returnValues: [],
                        decoded: false,
                        reference: originalContractCallMethodContext.reference,
                        methodName: originalContractCallMethodContext.methodName,
                        methodParameters: originalContractCallMethodContext.methodParameters,
                        success: false,
                      })
                    )
                  }
                } else {
                  returnObjectResult.callsReturnContext.push(
                    utils_2.Utils.deepClone({
                      returnValues: this.getReturnDataFromResult(methodContext.result),
                      decoded: false,
                      reference: originalContractCallMethodContext.reference,
                      methodName: originalContractCallMethodContext.methodName,
                      methodParameters: originalContractCallMethodContext.methodParameters,
                      success: true,
                    })
                  )
                }
              }
              returnObject.results[returnObjectResult.originalContractCallContext.reference] = returnObjectResult
            }
            return [2 /*return*/, returnObject]
        }
      })
    })
  }
  /**
   * Get return data from result
   * @param result The result
   */
  // tslint:disable-next-line: no-any
  Multicall.prototype.getReturnDataFromResult = function (result) {
    if (this._options.tryAggregate) {
      return result.returnData
    }
    return result
  }
  /**
   * Format return values so its always an array
   * @param decodedReturnValues The decoded return values
   */
  // tslint:disable-next-line: no-any
  Multicall.prototype.formatReturnValues = function (decodedReturnValues) {
    var decodedReturnResults = decodedReturnValues
    if (decodedReturnValues.length === 1) {
      decodedReturnResults = decodedReturnValues[0]
    }
    if (Array.isArray(decodedReturnResults)) {
      return decodedReturnResults
    }
    return [decodedReturnResults]
  }
  /**
   * Build aggregate call context
   * @param contractCallContexts The contract call contexts
   */
  Multicall.prototype.buildAggregateCallContext = function (contractCallContexts) {
    var aggregateCallContext = []
    for (var contract = 0; contract < contractCallContexts.length; contract++) {
      var contractContext = contractCallContexts[contract]
      var executingInterface = new ethers_1.ethers.utils.Interface(JSON.stringify(contractContext.abi))
      for (var method = 0; method < contractContext.calls.length; method++) {
        // https://github.com/ethers-io/ethers.js/issues/211
        var methodContext = contractContext.calls[method]
        // tslint:disable-next-line: no-unused-expression
        var encodedData = executingInterface.encodeFunctionData(
          methodContext.methodName,
          methodContext.methodParameters
        )
        aggregateCallContext.push({
          contractContextIndex: utils_2.Utils.deepClone(contract),
          contractMethodIndex: utils_2.Utils.deepClone(method),
          target: contractContext.contractAddress,
          encodedData: encodedData,
        })
      }
    }
    return aggregateCallContext
  }
  /**
   * Find output types from abi
   * @param abi The abi
   * @param methodName The method name
   */
  Multicall.prototype.findOutputTypesFromAbi = function (abi, methodName) {
    var _a
    var contract = new ethers_1.ethers.Contract(ethers_1.ethers.constants.AddressZero, abi)
    methodName = methodName.trim()
    if (contract.interface.functions[methodName]) {
      return contract.interface.functions[methodName].outputs
    }
    for (var i = 0; i < abi.length; i++) {
      if (((_a = abi[i].name) === null || _a === void 0 ? void 0 : _a.trim()) === methodName) {
        return abi[i].outputs
      }
    }
    return undefined
  }
  /**
   * Execute the multicall contract call
   * @param calls The calls
   */
  Multicall.prototype.execute = function (calls, options) {
    return __awaiter(this, void 0, void 0, function () {
      var _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _a = this._executionType
            switch (_a) {
              case enums_1.ExecutionType.web3:
                return [3 /*break*/, 1]
              case enums_1.ExecutionType.ethers:
                return [3 /*break*/, 3]
              case enums_1.ExecutionType.customHttp:
                return [3 /*break*/, 3]
            }
            return [3 /*break*/, 5]
          case 1:
            return [4 /*yield*/, this.executeWithWeb3(calls, options)]
          case 2:
            return [2 /*return*/, _b.sent()]
          case 3:
            return [4 /*yield*/, this.executeWithEthersOrCustom(calls, options)]
          case 4:
            return [2 /*return*/, _b.sent()]
          case 5:
            throw new Error(this._executionType + ' is not defined')
        }
      })
    })
  }
  /**
   * Execute aggregate with web3 instance
   * @param calls The calls context
   */
  Multicall.prototype.executeWithWeb3 = function (calls, options) {
    return __awaiter(this, void 0, void 0, function () {
      var web3, networkId, contract, callParams, contractResponse, contractResponse
      var _a, _b
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            web3 = this.getTypedOptions().web3Instance
            return [4 /*yield*/, web3.eth.net.getId()]
          case 1:
            networkId = _c.sent()
            contract = new web3.eth.Contract(Multicall.ABI, this.getContractBasedOnNetwork(networkId))
            callParams = []
            if (options.blockNumber) {
              callParams.push(options.blockNumber)
            }
            if (!this._options.tryAggregate) return [3 /*break*/, 3]
            return [
              4 /*yield*/,
              (_a = contract.methods.tryBlockAndAggregate(
                false,
                this.mapCallContextToMatchContractFormat(calls)
              )).call.apply(_a, callParams),
            ]
          case 2:
            contractResponse = _c.sent()
            contractResponse.blockNumber = ethers_1.BigNumber.from(contractResponse.blockNumber)
            return [2 /*return*/, this.buildUpAggregateResponse(contractResponse, calls)]
          case 3:
            return [
              4 /*yield*/,
              (_b = contract.methods.aggregate(this.mapCallContextToMatchContractFormat(calls))).call.apply(
                _b,
                callParams
              ),
            ]
          case 4:
            contractResponse = _c.sent()
            contractResponse.blockNumber = ethers_1.BigNumber.from(contractResponse.blockNumber)
            return [2 /*return*/, this.buildUpAggregateResponse(contractResponse, calls)]
        }
      })
    })
  }
  /**
   * Execute with ethers using passed in provider context or custom one
   * @param calls The calls
   */
  Multicall.prototype.executeWithEthersOrCustom = function (calls, options) {
    return __awaiter(this, void 0, void 0, function () {
      var ethersProvider, customProvider, network, contract, overrideOptions, contractResponse, contractResponse
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            ethersProvider = this.getTypedOptions().ethersProvider
            if (!ethersProvider) {
              customProvider = this.getTypedOptions()
              if (customProvider.nodeUrl) {
                ethersProvider = new ethers_1.ethers.providers.JsonRpcProvider(customProvider.nodeUrl)
              } else {
                ethersProvider = ethers_1.ethers.getDefaultProvider()
              }
            }
            return [4 /*yield*/, ethersProvider.getNetwork()]
          case 1:
            network = _a.sent()
            contract = new ethers_1.ethers.Contract(
              this.getContractBasedOnNetwork(network.chainId),
              Multicall.ABI,
              ethersProvider
            )
            overrideOptions = {}
            if (options.blockNumber) {
              overrideOptions = __assign(__assign({}, overrideOptions), { blockTag: Number(options.blockNumber) })
            }
            if (!this._options.tryAggregate) return [3 /*break*/, 3]
            return [
              4 /*yield*/,
              contract.callStatic.tryBlockAndAggregate(
                false,
                this.mapCallContextToMatchContractFormat(calls),
                overrideOptions
              ),
            ]
          case 2:
            contractResponse = _a.sent()
            return [2 /*return*/, this.buildUpAggregateResponse(contractResponse, calls)]
          case 3:
            return [
              4 /*yield*/,
              contract.callStatic.aggregate(this.mapCallContextToMatchContractFormat(calls), overrideOptions),
            ]
          case 4:
            contractResponse = _a.sent()
            return [2 /*return*/, this.buildUpAggregateResponse(contractResponse, calls)]
        }
      })
    })
  }
  /**
   * Build up the aggregated response from the contract response mapping
   * metadata from the calls
   * @param contractResponse The contract response
   * @param calls The calls
   */
  Multicall.prototype.buildUpAggregateResponse = function (contractResponse, calls) {
    var aggregateResponse = {
      blockNumber: contractResponse.blockNumber.toNumber(),
      results: [],
    }
    var _loop_1 = function (i) {
      var existingResponse = aggregateResponse.results.find(function (c) {
        return c.contractContextIndex === calls[i].contractContextIndex
      })
      if (existingResponse) {
        existingResponse.methodResults.push({
          result: contractResponse.returnData[i],
          contractMethodIndex: calls[i].contractMethodIndex,
        })
      } else {
        aggregateResponse.results.push({
          methodResults: [
            {
              result: contractResponse.returnData[i],
              contractMethodIndex: calls[i].contractMethodIndex,
            },
          ],
          contractContextIndex: calls[i].contractContextIndex,
        })
      }
    }
    for (var i = 0; i < contractResponse.returnData.length; i++) {
      _loop_1(i)
    }
    return aggregateResponse
  }
  /**
   * Map call contract to match contract format
   * @param calls The calls context
   */
  Multicall.prototype.mapCallContextToMatchContractFormat = function (calls) {
    return calls.map(function (call) {
      return {
        target: call.target,
        callData: call.encodedData,
      }
    })
  }
  /**
   * Get typed options
   */
  Multicall.prototype.getTypedOptions = function () {
    return this._options
  }
  /**
   * Get the contract based on the network
   * @param tryAggregate The tryAggregate
   * @param network The network
   */
  Multicall.prototype.getContractBasedOnNetwork = function (network) {
    // if they have overriden the multicall custom contract address then use that
    if (this._options.multicallCustomContractAddress) {
      return this._options.multicallCustomContractAddress
    }
    switch (network) {
      case enums_1.Networks.mainnet:
      case enums_1.Networks.forkmainnet:
      case enums_1.Networks.ropsten:
      case enums_1.Networks.rinkeby:
      case enums_1.Networks.goerli:
      case enums_1.Networks.optimism:
      case enums_1.Networks.kovan:
      case enums_1.Networks.matic:
      case enums_1.Networks.kovanOptimism:
      case enums_1.Networks.xdai:
      case enums_1.Networks.goerliOptimism:
      case enums_1.Networks.arbitrum:
      case enums_1.Networks.rinkebyArbitrum:
      case enums_1.Networks.goerliArbitrum:
      case enums_1.Networks.mumbai:
      case enums_1.Networks.sepolia:
      case enums_1.Networks.avalancheMainnet:
      case enums_1.Networks.avalancheFuji:
      case enums_1.Networks.fantomTestnet:
      case enums_1.Networks.fantom:
      case enums_1.Networks.bsc:
      case enums_1.Networks.bsc_testnet:
      case enums_1.Networks.moonbeam:
      case enums_1.Networks.moonriver:
      case enums_1.Networks.moonbaseAlphaTestnet:
      case enums_1.Networks.harmony:
      case enums_1.Networks.cronos:
      case enums_1.Networks.fuse:
      case enums_1.Networks.songbirdCanaryNetwork:
      case enums_1.Networks.costonTestnet:
      case enums_1.Networks.boba:
      case enums_1.Networks.aurora:
      case enums_1.Networks.astar:
      case enums_1.Networks.okc:
      case enums_1.Networks.heco:
      case enums_1.Networks.metis:
      case enums_1.Networks.rsk:
      case enums_1.Networks.rskTestnet:
      case enums_1.Networks.evmos:
      case enums_1.Networks.evmosTestnet:
      case enums_1.Networks.thundercore:
      case enums_1.Networks.thundercoreTestnet:
      case enums_1.Networks.oasis:
      case enums_1.Networks.celo:
      case enums_1.Networks.godwoken:
      case enums_1.Networks.godwokentestnet:
      case enums_1.Networks.klatyn:
      case enums_1.Networks.milkomeda:
      case enums_1.Networks.kcc:
        return '0xcA11bde05977b3631167028862bE2a173976CA11'
      case enums_1.Networks.etherlite:
        return '0x21681750D7ddCB8d1240eD47338dC984f94AF2aC'
      case enums_1.Networks.confluxeSpace:
        return '0xEFf0078910f638cd81996cc117bccD3eDf2B072F'
      default:
        throw new Error(
          'Network - ' +
            network +
            " doesn't have a multicall contract address defined. Please check your network or deploy your own contract on it."
        )
    }
  }
  // exposed as public as people can decide to use this outside multicall.call
  Multicall.ABI = [
    {
      constant: false,
      inputs: [
        {
          components: [
            { name: 'target', type: 'address' },
            { name: 'callData', type: 'bytes' },
          ],
          name: 'calls',
          type: 'tuple[]',
        },
      ],
      name: 'aggregate',
      outputs: [
        { name: 'blockNumber', type: 'uint256' },
        { name: 'returnData', type: 'bytes[]' },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bool',
          name: 'requireSuccess',
          type: 'bool',
        },
        {
          components: [
            {
              internalType: 'address',
              name: 'target',
              type: 'address',
            },
            {
              internalType: 'bytes',
              name: 'callData',
              type: 'bytes',
            },
          ],
          internalType: 'struct Multicall2.Call[]',
          name: 'calls',
          type: 'tuple[]',
        },
      ],
      name: 'tryBlockAndAggregate',
      outputs: [
        {
          internalType: 'uint256',
          name: 'blockNumber',
          type: 'uint256',
        },
        {
          internalType: 'bytes32',
          name: 'blockHash',
          type: 'bytes32',
        },
        {
          components: [
            {
              internalType: 'bool',
              name: 'success',
              type: 'bool',
            },
            {
              internalType: 'bytes',
              name: 'returnData',
              type: 'bytes',
            },
          ],
          internalType: 'struct Multicall2.Result[]',
          name: 'returnData',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]
  return Multicall
})()
exports.Multicall = Multicall
