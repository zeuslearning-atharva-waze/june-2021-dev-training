"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToChannel = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const connectToChannel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let connection = yield amqplib_1.default.connect("amqps://vdijnlyp:bLo_fW3txcTVxfoS1kqcf10zRbtGgGVQ@puffin.rmq2.cloudamqp.com/vdijnlyp");
        return connection.createChannel();
    }
    catch (e) {
        console.error("failed to create amqp channel: ", e);
    }
});
exports.connectToChannel = connectToChannel;
//# sourceMappingURL=rabbitMQ.js.map