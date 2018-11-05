import TrainingType from "../models/TrainingType";
import Training from "../models/Training";
import User from "../models/User";
import Question from '../models/Question';
import Competition from '../models/Competition';
import moment from 'moment';

export const fillRegisterData = async (id) => {
    await TrainingType.insertMany(
        [
            {
                user: id,
                name: 'Rozbieganie'
            },
            {
                user: id,
                name: 'Długie rozbieganie'
            },
            {
                user: id,
                name: 'Siła biegowa'
            },
            {
                user: id,
                name: 'Interwały'
            },
            {
                user: id,
                name: 'Zabawa biegowa'
            },
            {
                user: id,
                name: 'Szybkość'
            },
            {
                user: id,
                name: 'II zakres'
            },
            {
                user: id,
                name: 'III zakres'
            },
            {
                user: id,
                name: 'Zawody'
            },
            {
                user: id,
                name: 'Siła ogólna/sprawność'
            }
        ]
    );
};

export const fillSampleData = (id) => {
    fillUsers(id);
    fillTrainings(id);
    fillQuestions(id);
    fillCometitions(id);
}

const fillCometitions = async (id) => {
    const competitions = [
        {
            user: id,
            name: 'Bieg po złote kalesony',
            distance: 12,
            date: new Date()
        },
        {
            user: id,
            name: 'Wiosenne biegi przełajowe',
            distance: 5,
            date: new Date()
        },
        {
            user: id,
            name: 'Bieg solidarności',
            distance: 21.097,
            date: new Date()
        },
    ]

    try {
        await Competition.insertMany(competitions);
    } catch(e) {
        console.log('Error:' + e)
    }
}

const fillQuestions = async (id) => {
    const questions = [
        {
            user: id,
            question: 'Płeć',
            type: 3,
            options: [
                'Mężczyzna', 'Kobieta'
            ],
            order: 0
        },
        {
            user: id,
            question: 'Waga',
            type: 1,
            order: 1
        },
        {
            user: id,
            question: 'Wzrost',
            type: 1,
            order: 2
        },
        {
            user: id,
            question: 'Ile lat już trenujesz?',
            type: 1,
            order: 3
        },
        {
            user: id,
            question: 'Jakie są Twoje plany/cele?',
            type: 1,
            order: 4
        },
        {
            user: id,
            question: 'Czy masz jakieś przeciwwskazania do uprawiania sportu? Jeśli tak to je wymień',
            type: 2,
            order: 5
        },
    ]

    try {
        await Question.insertMany(questions);
    } catch(e) {
        console.log('Error:' + e)
    }
}

const fillUsers = async (id) => {
    const users = [
        {
            name: {
                firstName: 'Jan',
                lastName: 'Kowalski'
            },
            email: uniqueEmail(),
            password: '12345678',
            coach: 0,
            coachId: id
        },
        {
            name: {
                firstName: 'Paweł',
                lastName: 'Nowak'
            },
            email: uniqueEmail(),
            password: '12345678',
            coach: 0,
            coachId: id
        }
    ];
    try {
        await User.insertMany(users);
    } catch(e) {
        console.log('Error:' + e)
    }
}

const fillTrainings = async (id) => {
    const trainings = [];
    const countUser = await User.find({coachId: id}).count().exec();
    const countTrainingType = await TrainingType.find({user: id}).count().exec();
    for (let i = 2; i < 16; i = i + (Boolean(Math.random() > 0.5) + 1)) {
        const user = await User.findOne().skip(Math.floor(Math.random() * countUser));
        const trainingType = await TrainingType.findOne({user: id}).skip(Math.floor(Math.random() * countTrainingType));
        const date = moment().toDate();
        trainings.push({
            user: id,
            trainingType: trainingType._id,
            content: 'Przykładowy opis treningu',
            note: 'Przykładowy komentarz (opcjonalny)',
            amount: Math.floor(Math.random() * 16 + 6) + '',
            done: Boolean(Math.random() > 0.5),
            createdAt: moment().startOf('isoweek').add(8, 'days').subtract(i, 'days').toDate()
        })
    }

    try {
        await Training.insertMany(trainings);
    } catch(e) {
        console.log('Error:' + e)
    }
}

const uniqueEmail = () => {
    let email, data = [];
    do {
        email = generateEmail();
        data = checkUser(email);
    } while (data.length <= 0)
    return email;
}

const generateEmail = () => {
    const e1 = Math.random().toString(36);
    const e2 = Math.random().toString(36);
    const e3 = Math.random().toString(36);
    const e4 = Math.random().toString(36).replace(/[^a-z]+/g, '');
    return `${e1}.${e2}@${e3}.${e1}`;
}

const checkUser = async (email) => {
    const res = await User.find({email: email});
    return res.data;
}