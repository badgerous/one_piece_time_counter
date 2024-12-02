episodes_count = 1122 # as of 28.11.2024
episode_length = 20 # average episode length in minutes
hours_per_day = 8 # average watching hours per day

while True:
  try:
    current_episode = int(input("What episode are you watching right now? "))
    break
  except: 
    print("Please enter a number! Only digits allowed.")

episodes_left = episodes_count - current_episode
all_minutes_left = episodes_left * episode_length
hours_left = all_minutes_left // 60
minutes_left = all_minutes_left % 60
days_left = hours_left // hours_per_day + 1 if hours_left % hours_per_day > 0 else hours_left // hours_per_day

print("Episodes left: " + str(episodes_left))
print("Time left: " + str(hours_left) + " hours and " + str(minutes_left) + " minutes")
print("Days left: " + str(days_left) + ", if watching " + str(hours_per_day) + " hours per day.")
