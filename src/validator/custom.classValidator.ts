import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export function IsDayOfWeek(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDayOfWeek',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log(args);
          return (
            Array.isArray(value) &&
            value.every(
              (v) =>
                typeof v === 'string' && DAYS_OF_WEEK.includes(v.toUpperCase()),
            )
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an array of valid day abbreviations: ${DAYS_OF_WEEK.join(', ')}`;
        },
      },
    });
  };
}
