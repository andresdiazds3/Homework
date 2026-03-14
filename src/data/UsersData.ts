import randomArrivalTime from "../utils/RandomArrivalFunction";
import { User } from "../classes/User";

export const MockedUsers: User[] = [
	new User({
		name: 'Cesar Andres Diaz',
		amount: 200,
		date: randomArrivalTime()
	}),
	new User({
		name: 'Maria Fernanda Lopez',
		amount: 350,
		date: randomArrivalTime()
	}),
	new User({
		name: 'Luis Alberto Perez',
		amount: 120,
		date: randomArrivalTime()
	}),
	new User({
		name: 'Camila Andrea Torres',
		amount: 500,
		date: randomArrivalTime()
	}),
	new User({
		name: 'Jorge Ivan Ramirez',
		amount: 280,
		date: randomArrivalTime()
	})
]

