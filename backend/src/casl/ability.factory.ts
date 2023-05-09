import { AbilityTuple, ExtractSubjectType, MongoAbility, MongoQuery, Subject, defineAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Emotion } from '../models/emotions/entities/emotion.entity';
import { User } from '../models/users/entities/user.entity';
import { Action } from './action.enum';
import { Role } from '../common/constants/role.enum';
import { Day } from '../models/days/entities/day.entity';

type AppAbility = MongoAbility<AbilityTuple, MongoQuery>;

@Injectable()
export class AbilityFactory {

  public createForUser(user: User): AppAbility {
    return defineAbility(can => {
      switch (user.role) {
        case Role.ADMIN:
          can(Action.MANAGE, 'all');
          break;
        case Role.USER:
          can(Action.READ, User);
          can(Action.UPDATE, User, { id: user.id });
          can(Action.CREATE, Emotion);
          can(Action.READ, Emotion);
          can(Action.UPDATE, Emotion, { userId: user.id });
          can(Action.DELETE, Emotion, { userId: user.id });
          can(Action.CREATE, Day);
          can(Action.READ, Day);
          can(Action.UPDATE, Day, { userId: user.id });
          can(Action.DELETE, Day, { userId: user.id });
          break;
      }
    }, {
      detectSubjectType: subject => subject.constructor as ExtractSubjectType<Subject>
    });
  }
}
