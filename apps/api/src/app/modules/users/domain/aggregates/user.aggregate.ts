import { AggregateRoot } from '@nestjs/cqrs';

import { Uuid } from '../../../../../../../shared/application/services/uuid.service';
import { UserAudiences } from '../../../../../../../shared/domain/enums/user-audiences.enum';
import { UserCreatedDomainEvent } from '../../../../../../../shared/domain/events/user-created.domain-event';
import { UserUpdatedDomainEvent } from '../../../../../../../shared/domain/events/user-updated.domain-event';
import { DomainEvent } from '../../../../../../../shared/domain/models/domain-event.model';

export class User extends AggregateRoot<DomainEvent> {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	readonly password: string;

	readonly audiences: Array<UserAudiences>;

	constructor(id: string, name?: string, email?: string, password?: string) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	static create(id: string, name: string, email: string, password: string): User {
		const user = new User(id, name, email, password);

		user.apply(
			new UserCreatedDomainEvent({
				aggregateId: id,
				eventId: Uuid.random(),
				occurredOn: new Date(),
				attributes: user,
			}),
		);

		return user;
	}

	static update(id: string, name?: string, email?: string): User {
		const user = new User(id, name, email);

		user.apply(
			new UserUpdatedDomainEvent({
				aggregateId: id,
				eventId: Uuid.random(),
				occurredOn: new Date(),
				attributes: user,
			}),
		);

		return user;
	}
}
