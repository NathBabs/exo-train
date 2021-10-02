import { Train } from './ExoTrain';

const train = new Train('HPRPH');
const struct = train.structure;
train.detachHead();
train.print();