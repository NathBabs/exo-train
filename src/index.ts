import { Train } from './ExoTrain';

const train = new Train('HPP');
const struct = train.structure;
train.detachHead();
train.print();