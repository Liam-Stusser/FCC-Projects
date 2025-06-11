def add_time(start, duration, day=None):
    days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    def to_minutes(time):
        hour, minutes = map(int, time.split(':'))
        return hour * 60 + minutes

    def parse_start(time):
        time = time.strip().lower()
        if 'am' in time:
            time = time.replace('am', '').strip()
            hour, minutes = map(int, time.split(':'))
            return (0 if hour == 12 else hour) * 60 + minutes
        elif 'pm' in time:
            time = time.replace('pm', '').strip()
            hour, minutes = map(int, time.split(':'))
            return (12 if hour == 12 else hour + 12) * 60 + minutes
        else:
            raise ValueError("Start time must include AM or PM")

    def to_meridian(minutes):
        hour, minutes = divmod(minutes % 1440, 60)
        meridian = 'AM' if hour < 12 else 'PM'
        hour = 12 if hour == 0 or hour == 12 else hour % 12
        return f"{hour}:{minutes:02d} {meridian}"

    try:
        start_mins = parse_start(start)
        duration_mins = to_minutes(duration)
    except Exception:
        return "Invalid time format"

    total = start_mins + duration_mins
    days_later = total // 1440
    result_time = to_meridian(total)

    # Handle optional day
    if day:
        day_clean = day.strip().lower()
        if not day_clean.isalpha() or day_clean not in days:
            return 'Invalid day of week'
        new_day = days[(days.index(day_clean) + days_later) % 7].capitalize()
        if days_later == 0:
            return f"{result_time}, {new_day}"
        elif days_later == 1:
            return f"{result_time}, {new_day} (next day)"
        else:
            return f"{result_time}, {new_day} ({days_later} days later)"
    else:
        if days_later == 0:
            return result_time
        elif days_later == 1:
            return f"{result_time} (next day)"
        else:
            return f"{result_time} ({days_later} days later)"
        
print(add_time('1:33 PM', '201:27', 'tuesday'))