https://www.home-assistant.io/docs/configuration/splitting_configuration/


## **!include_dir_list** 
вернет содержимое каталога в виде списка, где содержимое каждого файла является записью в списке. Элементы списка упорядочены на основе буквенно-цифрового порядка имен файлов.

Важно отметить, что каждый файл должен содержать только **одну** запись при использовании


было
```sql
automation:
    - alias: "Automation 1"
    - alias: "Automation 2"
```

стало 
```
### Два файла
#### automation/presence/automation1.yaml
alias: "Automation 1"
#### automation/presence/automation2.yaml
alias: "Automation 2"
```

## **!include_dir_named** 
вернет содержимое каталога в виде словаря, который отображает имя файла = содержимое файла.

было
```sql
alexa:
  intents:
    LocateIntent:
        action:
    WhereAreWeIntent:
        speech: 
```

стало 
```sql
### alexa/LocateIntent.yaml
action:

### alexa/WhereAreWeIntent.yaml
speech:
```

## **!include_dir_merge_list** 

вернет содержимое каталога в виде списка, объединив все файлы (которые должны содержать список) в 1 большой список.

Важно отметить, что при использовании !include_dir_merge_list необходимо включать список в каждый файл (каждый элемент списка обозначается дефисом [-]). Каждый файл может содержать одну или несколько записей

было
```sql
automation:
    - alias: "Automation 1"
    - alias: "Automation 2"
```
стало
```sql
### automation/presence.yaml
- alias: "Automation 1"
- alias: "Automation 2"
```



## **!include_dir_merge_named** 

вернет содержимое каталога в виде словаря, загрузив каждый файл и объединив его в 1 большой словарь.

было
```sql
group:
  bedroom:
  hallway:
  front_yard:
```

стало
```sql
### group/interior.yaml
bedroom:
hallway:

### group/exterior.yaml
front_yard:
```

## EXAMPLE: COMBINE !INCLUDE_DIR_MERGE_LIST WITH AUTOMATIONS.YAML

Using labels like manual or ui allows for using multiple keys in the config:

```sql
# My own handmade automations
automation manual: !include_dir_merge_list automations/

# Automations I create in the UI
automation ui: !include automations.yaml
```

### рекурсивно с автоматизацией

!include_dir_* automation