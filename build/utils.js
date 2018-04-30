'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.validateCardType=exports.cond=exports.validateCardNumber=exports.propOr=exports.isInArray=exports.identity=exports.Maybe=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();var _cardValidator=require('card-validator');var _cardValidator2=_interopRequireDefault(_cardValidator);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}// Maybe :: A -> Maybe<A>
var Maybe=exports.Maybe=function Maybe(x){return{map:function map(f){return x?Maybe.Just(f(x)):Maybe.Nothing(x)}// chain: f => x? f(x): Maybe.Nothing(x),
}};// Just :: A -> Just<A>
Maybe.Just=function(x){return{map:function map(f){return Maybe.Just(f(x))},// fold: f => f(x),
cata:function cata(_ref){var f=_ref.Just;return f(x)}}};// Nothing :: () -> Nothing
Maybe.Nothing=function(x){return{map:function map(){return Maybe.Nothing(x)},// fold: () => Maybe.Nothing(x),
cata:function cata(_ref2){var f=_ref2.Nothing;return f(x)}}};// log :: String -> A -> A
// export const log = prefix => x => {
//   console.log(prefix, x); // eslint-disable-line
//   return x;
// };
// identity :: A -> A
var identity=exports.identity=function identity(x){return x};// isInArray :: Array<A> -> A -> Boolean
var isInArray=exports.isInArray=function isInArray(arr){return function(el){return arr.indexOf(el)!==-1}};// propOr :: (String, A) -> Object<String, A> -> A
var propOr=exports.propOr=function propOr(propname,defaultVal){return function(obj){return obj?obj[propname]:defaultVal}};// validateCardNumber :: CardNumber -> ValidationResult
var validateCardNumber=exports.validateCardNumber=_cardValidator2.default.number;// cond :: (Boolean, Array<A -> B>) -> A -> B
var cond=exports.cond=function cond(condition,_ref3){var _ref4=_slicedToArray(_ref3,2),onTrue=_ref4[0],onFalse=_ref4[1];return function(value){return condition?onTrue(value):onFalse(value)}};// validateCardType :: ValidationResult -> ValidationResult
var validateCardType=exports.validateCardType=function validateCardType(validTypes){return function(result){result=_extends({},result,{isCardNumberValid:result.isValid});return Maybe(result.isValid&&!!validTypes.length).map(function(){return result.card}).map(propOr('type','')).map(isInArray(validTypes)).cata({Just:function Just(isValid){return _extends({},result,{isValid:isValid})},Nothing:function Nothing(){return result}})}};