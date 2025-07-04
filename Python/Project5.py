import copy
import random

class Hat:

    def __init__(self, **colors):
        if not colors:
            colors = {'red': 1}
        self.contents = []
        for color, value in colors.items():
            self.contents.extend([color] * value)

    def draw(self, amount):
        
        drawn = []
        for _ in range(min(amount, len(self.contents))):
            color = random.choice(self.contents)
            self.contents.remove(color)
            drawn.append(color)
        return drawn
    
    def __repr__(self):
        return f'Hat({self.contents})'

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
        
        m = 0
        n = num_experiments

        for _ in range(n):
            hat_copy = copy.deepcopy(hat)
            drawn = hat_copy.draw(num_balls_drawn)
            balls = {}

            for ball in drawn:
                if ball in balls:
                    balls[ball] += 1
                else:
                    balls[ball] = 1
              
            if all(balls.get(key, 0) >= expected_balls[key] for key in expected_balls):
                m += 1

        return m/n

hat = Hat(red=3, blue=2, green=6)
prob = experiment(hat, expected_balls={"red": 2, "green": 1}, num_balls_drawn=4, num_experiments=1000)
print("Estimated Probability:", prob)