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
        this.build();
    }

    print(): void {
        console.log(this.finalStructure.join(''));
    }

    build(): void {
        for (let index = 0; index < this.trainConfig.length; index++) {
            const element = this.trainConfig[index];

            if (this.finalStructure.length > 0) {
                this.finalStructure.push(this.getKeyValue('Joiner'));
            }

            if (index == 0 && element == 'H') {
                this.finalStructure.push(this.getKeyValue(element));
                continue;
            }

            if (index == this.trainConfig.length - 1 && element == 'H') {
                this.finalStructure.push(this.getKeyValue('h'));
                continue;
            }

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

        if (cIndex == -1) {
            console.log('There are no carriages to be filled');
            throw new Error('There are no carriages to be filed');
        }
        // reset finalStructure
        this.finalStructure.length = 0;
        strArr[cIndex] = 'c';

        this.trainConfig = strArr.join('');

    }

    //
    detachEnd(): void {
        if (this.finalStructure.length < 1) {
            throw new Error('Cannot detach End')
        }

        this.finalStructure.splice(0, 2)
    }

    detachHead(): void {
        if (this.finalStructure.length < 1) {
            throw new Error('Cannot detach End')
        }

        this.finalStructure.splice(-2, 2)
    }

    get structure(): string[] {
        return this.finalStructure;
    }
}