interface Config {
    P: string;
    R: string;
    C: string;
    c: string;
    H: string;
    h: string;
    Joiner: string;
}

export class Train {
    trainConfig: string | String;
    joiner: string = '::'
    finalStructure: string[] = [];
    config: Config = {
        P: '|OOOO|',
        R: '|hThT|',
        C: '|____|',
        c: '|^^^^|', // used a lowercase c to represent a carriage with people
        H: '<HHHH',
        h: 'HHHH>',
        Joiner: '::'
    };

    constructor(trainConfig: string) {
        this.trainConfig = trainConfig;
        // calls the build method on initialization
        this.build();
    }

    // prints to the console the ASCII art representation of the train
    print(): void {
        console.log(this.finalStructure.join(''));
    }

    build(): void {
        for (let index = 0; index < this.trainConfig.length; index++) {
            const element = this.trainConfig[index];

            // condition for joining cars
            if (this.finalStructure.length > 0) {
                this.finalStructure.push(this.getKeyValue('Joiner'));
            }

            // checks if the first character is a locomotive and uses a locomotive end art
            if (index == 0 && element == 'H') {
                this.finalStructure.push(this.getKeyValue(element));
                continue;
            }

            //checks if the last character is a locomotive and uses a locomotive start art
            if (index == this.trainConfig.length - 1 && element == 'H') {
                this.finalStructure.push(this.getKeyValue('h'));
                continue;
            }

            // gets for the rest types of cars
            this.finalStructure.push(this.getKeyValue(element))

        }
        return;
    }

    getKeyValue(propName: string): string {
        return this.config[propName as keyof Config]
    }

    // use Array find to find first occurence of |____|
    // rather access the initial string and change a 'C' to 'c'
    fillTrain(): void {
        const strArr: Array<string> | any = this.trainConfig.split('');

        // get index of the first ocurrence of 'C'
        let cIndex = strArr.indexOf('C')

        // if index is -1 , it means 'C' wasn't found in the array
        if (cIndex == -1) {
            throw new Error('There are no carriages to be filed');
        }
        // reset finalStructure
        this.finalStructure.length = 0;
        // if C is found, replace it with a lowercase c
        strArr[cIndex] = 'c';

        // join all strings in the array and assign it as the new trainConfig
        this.trainConfig = strArr.join('');

    }

    //
    detachEnd(): void {
        // checks if the final structure length is less than 1, because there will be no end to detach
        if (this.finalStructure.length < 1) {
            throw new Error('Cannot detach End')
        }
        // else remove the first car and the joiner to the next one
        this.finalStructure.splice(0, 2)
    }

    detachHead(): void {
        if (this.finalStructure.length < 1) {
            throw new Error('Cannot detach End')
        }

        // removes the head and the joiner
        this.finalStructure.splice(-2, 2)
    }

    get structure(): string[] {
        return this.finalStructure;
    }
}