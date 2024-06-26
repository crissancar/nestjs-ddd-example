import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Bcrypt } from '../../../../../../../shared/application/services/bcrypt.service';
import { UserAudiences } from '../../../../../../../shared/domain/enums/user-audiences.enum';
import { TimestampEntity } from '../../../../../../../shared/infrastructure/persistence/timestamp.entity';
import { usersConfig } from '../../users.config';

const { entity } = usersConfig;

@Entity(entity)
export class BackofficeUserEntity extends TimestampEntity {
	@PrimaryColumn({ update: false })
	id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column({
		type: 'enum',
		enum: UserAudiences,
		array: true,
		default: [UserAudiences.GENERAL],
	})
	audiences: Array<UserAudiences>;

	constructor(
		id: string,
		name: string,
		email: string,
		password: string,
		audiences: Array<UserAudiences>,
	) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.audiences = audiences;
	}

	static create(
		id: string,
		name: string,
		email: string,
		password: string,
		audiences?: Array<UserAudiences>,
	): BackofficeUserEntity {
		return new BackofficeUserEntity(id, name, email, password, audiences);
	}

	static comparePasswords(password: string, hashedPassword: string): boolean {
		return Bcrypt.compare(password, hashedPassword);
	}
}
