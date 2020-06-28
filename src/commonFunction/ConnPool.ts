import { Connection, createConnection } from 'typeorm';
const connections: any = {};

export async function getConnection(): Promise<Connection> {
	connections['knowledgebase'] = await createConnection();
	return connections;
}
