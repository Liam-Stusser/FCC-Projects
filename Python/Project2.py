def add_time(start, duration, day=None):
    days_of_week = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
    start_in_minutes = meridian_to_standard(start)
    duration_in_minutes = convert_to_minutes(duration)
    past_days = (start_in_minutes + duration_in_minutes) // 1440
    new_time = (start_in_minutes + duration_in_minutes) % 1440

    new_time_str = standard_to_meridian(new_time)

    if day:
        cleaned_input = day.lower().strip()

        if not cleaned_input.isalpha():
            return 'Day of week invalid, non-alpha character detected'

        if cleaned_input not in days_of_week:
            return 'Invalid day of week'

        start_index = days_of_week.index(cleaned_input)
        new_day_index = (start_index + past_days) % 7
        new_day = days_of_week[new_day_index].capitalize()

        if past_days == 0:
            return f"{new_time_str}, {new_day}"
        elif past_days == 1:
            return f"{new_time_str}, {new_day} (next day)"
        else:
            return f"{new_time_str}, {new_day} ({past_days} days later)"
    else:
        if past_days == 0:
            return new_time_str
        elif past_days == 1:
            return f"{new_time_str} (next day)"
        else:
            return f"{new_time_str} ({past_days} days later)"

def meridian_to_standard(time):

    cleaned_input = time.strip().lower()

    if len(cleaned_input) > 8:
        return 'Please enter a valid time for start'

    if 'am' in cleaned_input:

        cleaned_input = cleaned_input.replace('am','')
        split_point = cleaned_input.find(':')
        hours = cleaned_input[:split_point]
        minutes = cleaned_input[(split_point + 1):]

        if hours == '12':
            return convert_to_minutes('00:' + minutes)
        else:
            return convert_to_minutes(cleaned_input)
    elif 'pm' in cleaned_input:

        cleaned_input = cleaned_input.replace('pm','')
        split_point = cleaned_input.find(':')
        hours = cleaned_input[:split_point]
        minutes = cleaned_input[(split_point + 1):]

        if hours == '12':
            new_time = (convert_to_minutes(cleaned_input))
            return new_time
        else:
            new_time = (convert_to_minutes(cleaned_input)) + 720
            return new_time
    else:
        return 'Error am or pm not found in start time'
    
def standard_to_meridian(time):
    hours = (time // 60) % 24
    minutes = time % 60

    meridian = 'AM'
    if hours >= 12:
        meridian = 'PM'
    if hours == 0:
        display_hour = '12'
    elif hours > 12:
        display_hour = hours - 12
    else:
        display_hour = hours

    return f"{display_hour}:{minutes:02d} {meridian}"
    
def convert_to_minutes(time):

    if ':' not in time:
        return 'Error \':\' not found, please enter valid format'
    
    split_point = time.find(':')
    
    hours = int(time[:split_point]) * 60
    minutes = int(time[(split_point + 1):])

    total_time = hours + minutes
    return total_time

print(add_time('1:33 PM', '201:27', 'tuesday'))