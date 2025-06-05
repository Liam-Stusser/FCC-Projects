import random as rand
import sys


def Dice(dice):
    match dice:
        case 20:
            roll = rand.randint(1, 20)
        case 12:
            roll = rand.randint(1, 12)
        case 10:
            roll = rand.randint(1, 10)
        case 8:
            roll = rand.randint(1, 8)
        case 6:
            roll = rand.randint(1, 6)
        case 4:
            roll = rand.randint(1,4)
    return roll

def Main():
    run = True
    rolls = {'D20': [], 'D12': [], 'D10': [], 'D8': [], 'D6': [], 'D4': []}
    while run:
        print('\nD&D')
        print('Select your dice to roll')
        print('\n1. D20\n2. D12\n3. D10\n4. D8\n5. D6\n6. D4')
        selection = input()
        if selection.isalpha:
            try:
                cleaned_input = int(selection)
            except:
                TypeError('Input must be a number between 1-6')
            if cleaned_input < 0 & cleaned_input > 6:
                print('Please enter a number between 1-6')
            else:
                current_roll = 0
                match cleaned_input:
                    case 1:
                        current_roll = Dice(20)
                        rolls['D20'].append(current_roll)
                        print(f'You rolled an {current_roll}')
                    case 2:
                        current_roll = Dice(12)
                        rolls['D12'].append(current_roll)
                        print(f'You rolled an {current_roll}')
                    case 3:
                        current_roll = Dice(10)
                        rolls['D10'].append(current_roll)
                        print(f'You rolled an {current_roll}')
                    case 4:
                        current_roll = Dice(8)
                        rolls['D8'].append(current_roll)
                        print(f'You rolled an {current_roll}')
                    case 5:
                        current_roll = Dice(6)
                        rolls['D6'].append(current_roll)
                        print(f'You rolled an {current_roll}')
                    case 6:
                        current_roll = Dice(4)
                        rolls['D4'].append(current_roll)
                        print(f'You rolled an {current_roll}')
                    case 0:
                        run = False
                        sys.exit()
                choice = input('Roll another dice? y/n:')
                if choice != 'y' and choice != 'n':
                    print('Invalid option, roll added')
                    continue
                elif choice == 'y':
                    continue
                elif choice == 'n':
                    run = False
                else:
                    print('penis')

            print('\nTotal Rolls\n')
            for key in rolls:
                print(f'{key}: {rolls[key]}')
        else:
            print('Please enter a valid selection')

Main()