class Category:
    
    def __init__(self, name):
        self.name = name
        self.ledger = []
        self.funds = 0

    def deposit(self, amount, description = ''):

        if not isinstance(amount, (int,float)):
            return 'Amount entered must be a valid number'

        self.funds += amount
        self.ledger.append({'amount': amount, 'description': description})
    
    def withdraw(self, amount, description = ''):

        if not isinstance(amount, (int,float)):
            return 'Amount entered must be a valid number'
        elif not self.check_funds(amount):
            print('Amount entered is greater than available funds')
            return False
        
        self.funds -= amount
        self.ledger.append({'amount': -(amount), 'description': description})
        return True
    
    def get_balance(self):
        return self.funds

    def transfer(self, amount, category):
        
        if not self.check_funds(amount):
            print(f'Not enough funds available in {self.name}')
            return False
        
        self.withdraw(amount, f'Transfer to {category.name}')
        category.deposit(amount, f'Transfer from {self.name}')
        return True
    
    def check_funds(self, amount):

        if amount > self.funds:
            return False
        
        return True

    def __str__(self):

        title = f'{self.name:*^30}\n'
        items = ''

        for item in self.ledger:
            desc = item['description'][:23]
            amt = f"{item['amount']:.2f}"
            items += f"{desc:<23}{amt:>7}\n"

        total = f"Total: {self.funds:.2f}"

        return title + items + total
    
    def __repr__(self):
        return f'{self.__class__.__name__}("name")'

def create_spend_chart(categories):
    spending = {}

    for cat in categories:
        spent = sum(-entry['amount'] for entry in cat.ledger if entry['amount'] < 0)
        spending[cat.name] = spent

    total = sum(spending.values())
    percentages = {k: int((v / total) * 100) // 10 * 10 for k, v in spending.items()}

    chart = 'Percentage spent by category\n'
    for i in range(100, -1, -10):
        chart += f"{i:>3}|"
        for name in spending:
            chart += " o " if percentages[name] >= i else "   "
        chart += " \n"
    chart += "    " + "-" * (len(categories) * 3 + 1) + "\n"

    names = [cat.name for cat in categories]
    max_len = max(len(name) for name in names)

    for i in range(max_len):
        chart += "    "
        for name in names:
            chart += f" {name[i] if i < len(name) else ' '} "
        chart += " \n"
    
    return chart.rstrip("\n")

#Testing

food = Category('Food')
clothing = Category('Clothing')
auto = Category('Auto')
sports = Category('Sports')

#Food
food.deposit(900, 'deposit')
food.withdraw(45.67, 'milk, cereal, eggs, bacon, bread')
food.withdraw(45.67, 'groceries')
food.withdraw(15.89, 'restaurant and more food for dessert')
food.transfer(50, clothing)

#clothing
clothing.deposit(300, 'initial deposit')
clothing.withdraw(8.5, 'New Socks')
clothing.withdraw(45.67, 'New Jeans')
clothing.withdraw(12.34, 'Suit Repair')

#auto
auto.deposit(250, 'initital deposit')
auto.withdraw(35.4, 'gas')
auto.withdraw(25.82, 'gas')
auto.withdraw(33.75, 'gas')

#sports
sports.deposit(500, 'initial deposit')
sports.withdraw(55.98, 'New bat and glove')
sports.withdraw(112.22, 'Team uniform')
sports.transfer(150, food)

print(food)
print(clothing)
print(auto)
print(sports)

print(create_spend_chart([food,clothing,auto,sports]))