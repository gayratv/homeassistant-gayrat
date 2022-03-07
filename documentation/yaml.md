**Платформа** 
делает соединение с определенной программной или аппаратной платформой (например, pushbullet работает со службой от pushbullet.com).

Each item in a collection starts with a -

<red>Tabs</red> are not allowed to be used for indentation

YAML validator

https://codebeautify.org/yaml-validator/


{{   }} — Expressions (выражения), эти конструкции после вычисления возвращают какой-то объект.

{%   %} — Statements

{% set a = 123 %}

{{-   }} или {%-   %} знак минуса в левой части уберет символ новой строки до текущей.

{{   -}} или {%   -%} знак минуса в правой части уберет символ новой строки после текущей.

[YAML Multiline](https://yaml-multiline.info/)

```yaml
example: |
··Several lines of text,\n
··with some "quotes" of various 'types',\n

варианты
example: >
example: >-  No newline at end (strip)
example: >+  All newlines from end (keep)
  
  - или + можно добавить и к |
```

```yaml
{{ 1 in [1, 2, 3] }} would, for example, return true.
{% if loop.index is divisibleby 3 %}  

```

[List of Builtin Filters](https://jinja.palletsprojects.com/en/3.0.x/templates/#list-of-builtin-filters)

```yaml
{{ "%s, %s!"|format(greeting, name) }}
{{ "%s, %s!" % (greeting, name) }}

{% for key, value in mydict|dictsort(false, 'value') %}
sort the dict by value, case insensitive
```

```yaml
binary_sensor:
  - platform: template
    sensors:
      # Создаем выделенный сенсор для водонагревателя, отражающий его статус (вкл\выкл)
      boiler_status:
        device_class: power
        # Сенсор примет состояние 'on', если стейт объекта switch.tplink_smartplug_01 будет 'on'
        value_template: "{{ is_state('switch.tplink_smartplug_01', 'on') }}"
      # Собственный датчик протечки, меняющий свое состояние в зависимости от input_boolean
      neptun_water_leakage:
        friendly_name: Датчики протечки Нептун
        device_class: 'moisture'
        value_template: >
          # Если input_boolean.neptun_activated = 'on', то у нас протечка
          {{ is_state('input_boolean.neptun_activated', "on") }}
      date_formatted:
        friendly_name: 'Date (DD.MM.YYYY)'
        value_template: "{{ as_timestamp(states('sensor.date_time_iso')) | timestamp_custom('%d.%m.%Y') }}"
        icon_template: mdi:calendar
        attribute_templates:
          day_of_week: >-
            {% set day_num = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"] %}
            {% set day_of_week = day_num[now().weekday()] %}
            {{ day_of_week }}
```

friendly_name через переменную - надо установить уникальный id - unique_id

```yaml
- sensor:
  - unique_id: light_count
    state: "{{ states.light | list | count }}"
    attributes:
      friendly_name: "{{ states.light | list | count }} lights are on"
  binary_sensor:
  - unique_id: lights_on
    state: "{{ states.light | list | count > 0 }}"
    attributes:
      friendly_name: "Lights are {{ 'on' if states.light | list | count > 0 else 'off' }}"
```

либо friendly_name_template
```yaml
- platform: template
  sensors:
    tplinksmartplug01_amps:
      friendly_name_template: "{{ states.switch.tplink_smartplug_01.name}} Current"
      value_template: '{{ state_attr("switch.tplink_smartplug_01","current_a") | float }}'
      unit_of_measurement: 'A'
    tplinksmartplug01_watts:
      friendly_name_template: "{{ states.switch.tplink_smartplug_01.name}} Current Consumption"
      value_template: '{{ state_attr("switch.tplink_smartplug_01","current_power_w") | float }}'
      unit_of_measurement: 'W'
```


Подскажите пожалуйста, в каких случаях необходимо ставить "-" перед атрибутом ?
Правильно я понимаю что "-" обозначает как бы элемент массива?
Почему одно и то же можно записать по разному, например:
```
- platform: template
  sensors:

template:
- sensor:
```

[Automation Trigger](https://www.home-assistant.io/docs/automation/trigger)

[Events](https://www.home-assistant.io/docs/configuration/events/)

Events can be fired by integrations or via the API.

[Built-in Events (core)](https://www.home-assistant.io/docs/configuration/events/#built-in-events-core)
- STATE_CHANGED
- CALL_SERVICE
- DATA_ENTRY_FLOW_PROGRESSED<br>
  This event is fired when a data entry flow has changed and is used by the frontend to reload the flow state