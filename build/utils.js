"use strict";Object.defineProperty(exports,"__esModule",{value:true});// Maybe :: A -> Maybe<A>
var Maybe=exports.Maybe=function Maybe(x){return{map:function map(f){return x?Maybe.Just(f(x)):Maybe.Nothing()}}};// Just :: A -> Just<A>
Maybe.Just=function(x){return{map:function map(f){return Maybe.Just(f(x))},cata:function cata(_ref){var f=_ref.Just;return f(x)}}};// Nothing :: () -> Nothing
Maybe.Nothing=function(x){return{map:function map(){return Maybe.Nothing(x)},cata:function cata(_ref2){var f=_ref2.Nothing;return f(x)}}};// log :: String -> A -> A
var log=exports.log=function log(prefix){return function(x){console.log(prefix,x);// eslint-disable-line
return x}};// setState :: Component -> A -> A
var setState=exports.setState=function setState(context){return function(state){context.setState(state);return state}};// identity :: A -> A
var identity=exports.identity=function identity(x){return x};