def arithmetic_arranger(problems, show_answers=True):
    final_problems = []

    if len(problems) > 5:
        return 'Error: Too many problems.'
    
    for problem in problems:

        clean_problem = ''.join(char for char in problem if char != ' ')
        plus_operator = clean_problem.find('+')
        minus_operator = clean_problem.find('-')

        if(plus_operator == -1 and minus_operator == -1):
            raise ValueError("Error: Operator must be '+' or '-'.")

        if(plus_operator != -1):
            first_operand = clean_problem[0:plus_operator]
            second_operand = clean_problem[plus_operator+1:len(clean_problem)]

            if (contains_letters(first_operand,second_operand)):
                return 'Error: Numbers must only contain digits.'
            elif (len(first_operand) > 4 or len(second_operand) > 4):
                return 'Error: Numbers cannot be more than four digits.'
            else:
                final_problems.append(convert_problem(first_operand, second_operand, '+', show_answers))
        else:
            first_operand = clean_problem[0:minus_operator]
            second_operand = clean_problem[minus_operator+1:]

            if (contains_letters(first_operand,second_operand)):
                return 'Error: Numbers must only contain digits.'
            elif (len(first_operand) > 4 or len(second_operand) > 4):
                return 'Error: Numbers cannot be more than four digits.'
            else:
                final_problems.append(convert_problem(first_operand, second_operand, '-', show_answers))

    lines = list(zip(*final_problems))
    return '\n'.join(['    '.join(line) for line in lines])

def convert_problem(first_operand, second_operand, operand, show_answers):
    longest_num = max(len(first_operand), len(second_operand))
    spacing = longest_num + 2

    first_number = format_value(spacing, first_operand)
    second_number = operand + format_value(spacing - 1, second_operand)
    dashes = '-' * spacing
    total = str(eval(first_operand + operand + second_operand))
    formatted_total = format_value(spacing, total)

    if show_answers:
        return [first_number, second_number, dashes, formatted_total]
    else:
        return [first_number, second_number, dashes]

def contains_letters(num_one, num_two):
    value = False
    for char in num_one:
        if(char.isalpha()):
            value = True
            break
        else:
            continue
    for char in num_two:
        if(char.isalpha()):
            value = True
            break
        else:
            continue
    return value

def format_value(spacing, value):
    return value.rjust(spacing)


print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])}')