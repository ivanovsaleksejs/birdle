/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  // Orders
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru) VALUES
    ('Baložveidīgie',	'Columbiformes',	'Голубеобразные'),
    ('Degunragputnveidīgie',	'Bucerotiformes',	'Птицы-носороги '),
    ('Dzilnveidīgie',	'Piciformes',	'Дятлообразные'),
    ('Dzērvjveidīgie',	'Gruiformes',	'Журавлеобразные'),
    ('Dūkurveidīgie',	'Podicipediformes',	'Поганкообразные'),
    ('Pelikānveidīgie',	'Pelecaniformes',	'Пеликанообразные'),
    ('Pelikānveidīgie',	'Suliformes',	'Олушеобразные'),
    ('Piekūnveidīgie',	'Falconiformes',	'Соколообразные'),
    ('Pūčveidīgie',	'Strigiformes',	'Совообразные'),
    ('Stārķveidīgie',	'Ciconiiformes',	'Аистообразные'),
    ('Svīrveidīgie',	'Apodiformes',	'Стрижеобразные'),
    ('Tārtiņveidīgie',	'Charadriiformes',	'Ржанкообразные'),
    ('Vanagveidīgie',	'Accipitriformes',	'Ястребообразные'),
    ('Vistveidīgie',	'Galliformes',	'Курообразные'),
    ('Zaļvārnveidīgie',	'Coraciiformes',	'Ракшеобразные'),
    ('Zosveidīgie',	'Anseriformes',	'Гусеобразные'),
    ('Zvirbuļveidīgie',	'Passeriformes',	'Воробьинообразные')
  `)

  // Families
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Baložu dzimta', 'Columbidae', 'Голубиные', id FROM birds_class WHERE name_en = 'Columbiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Bezdelīgu dzimta', 'Hirundinidae', 'Ласточковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Bārdzīlīšu dzimta', 'Panuridae', 'Усатыесиницы', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Cielavu dzimta', 'Motacillidae', 'Трясогузковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Cīruļu dzimta', 'Alaudidae', 'Жаворонковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dumbrvistiņu dzimta', 'Rallidae', 'Пастушковые', id FROM birds_class WHERE name_en = 'Gruiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dzilnu dzimta', 'Picidae', 'Дятловые', id FROM birds_class WHERE name_en = 'Piciformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dzilnīšu dzimta', 'Sittidae', 'Поползневые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dzērvju dzimta', 'Gruidae', 'Журавлиные', id FROM birds_class WHERE name_en = 'Gruiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dūkuru dzimta', 'Podicipedidae', 'Поганковые', id FROM birds_class WHERE name_en = 'Podicipediformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Fazānu dzimta', 'Phasianidae', 'Фазановые', id FROM birds_class WHERE name_en = 'Galliformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Garastīšu dzimta', 'Aegithalidae', 'Длиннохвостые синицы', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Gārņu dzimta', 'Ardeidae', 'Цаплевые', id FROM birds_class WHERE name_en = 'Pelecaniformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Jūraskraukļu dzimta', 'Phalacrocoracidae', 'Баклановые', id FROM birds_class WHERE name_en = 'Suliformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Kaiju dzimta', 'Laridae', 'Чайковые', id FROM birds_class WHERE name_en = 'Charadriiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Krāšņgalvīšu dzimta', 'Regulidae', 'Корольковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Krāšņgalvīšu dzimta', 'Regulidae', 'Корольковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Kāpelētājķauķu dzimta', 'Acrocephalidae', 'Камышовковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Mežastrazdu dzimta', 'Turdidae', 'Дроздовые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Mizložņu dzimta', 'Certhiidae', 'Пищуховые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Mušķērāju dzimta', 'Muscicapidae', 'Мухоловковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Paceplīšu dzimta', 'Troglodytidae', 'Крапивниковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Piekūnu dzimta', 'Falconidae', 'Соколиные', id FROM birds_class WHERE name_en = 'Falconiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Pupuķu dzimta', 'Upupidae', 'Удодовые', id FROM birds_class WHERE name_en = 'Bucerotiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Pīļu dzimta', 'Anatidae', 'Утиные', id FROM birds_class WHERE name_en = 'Anseriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Pūču dzimta', 'Strigidae', 'Совиные', id FROM birds_class WHERE name_en = 'Strigiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Sisinātājķauķu dzimta', 'Locustellidae', 'Сверчковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Sloku dzimta', 'Scolopacidae', 'Бекасовые', id FROM birds_class WHERE name_en = 'Charadriiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Somzīlīšu dzimta', 'Remizidae', 'Ремезовые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Strazdu dzimta', 'Sturnidae', 'Скворцовые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Stārķu dzimta', 'Ciconiidae', 'Аистовые', id FROM birds_class WHERE name_en = 'Ciconiiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Stērstu dzimta', 'Emberizidae', 'Овсянковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Svīru dzimta', 'Apodidae', 'Стрижиные', id FROM birds_class WHERE name_en = 'Apodiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Tārtiņu dzimta', 'Charadriidae', 'Ржанковые', id FROM birds_class WHERE name_en = 'Charadriiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Vanagu dzimta', 'Accipitridae', 'Ястребиные', id FROM birds_class WHERE name_en = 'Accipitriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Vārnu dzimta', 'Corvidae', 'Врановые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zaļvārnu dzimta', 'Coraciidae', 'Сизоворонковые', id FROM birds_class WHERE name_en = 'Coraciiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zivjudzenīšu dzimta', 'Alcedinidae', 'Зимородковые', id FROM birds_class WHERE name_en = 'Coraciiformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zvirbuļu dzimta', 'Passeridae', 'Воробьиные', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zīlīšu dzimta', 'Paridae', 'Синицевые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Čakstu dzimta', 'Laniidae', 'Сорокопутовые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ķauķu dzimta', 'Sylviidae', 'Славковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ķauķīšu dzimta', 'Phylloscopidae', 'Пеночковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Žubīšu dzimta', 'Fringillidae', 'Вьюрковые', id FROM birds_class WHERE name_en = 'Passeriformes'`)

  // Geni
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Baloži', 'Columba', 'Голуби', id FROM birds_class WHERE name_en = 'Columbidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Bezdelīgas', 'Hirundo', 'Настоящие ласточки', id FROM birds_class WHERE name_en = 'Hirundinidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Bārdzīlītes', 'Panurus', 'Усатые синицы', id FROM birds_class WHERE name_en = 'Panuridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Cekulzīlītes', 'Lophophanes', 'Хохлатые синицы', id FROM birds_class WHERE name_en = 'Paridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Cekulzīriņi', 'Thalasseus', 'Хохлатые крачки', id FROM birds_class WHERE name_en = 'Laridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Cielavas', 'Motacilla', 'Трясогузки', id FROM birds_class WHERE name_en = 'Motacillidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dadzīši', 'Carduelis', 'Щеглы', id FROM birds_class WHERE name_en = 'Fringillidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dižpīles', 'Tadorna', 'Пеганки', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dumpji', 'Botaurus', 'Выпи', id FROM birds_class WHERE name_en = 'Ardeidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dzeltenie tārtiņi', 'Pluvialis', 'Ржанки', id FROM birds_class WHERE name_en = 'Charadriidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dzilnīši', 'Sitta', 'Поползни', id FROM birds_class WHERE name_en = 'Sittidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dzērves', 'Grus', 'Журавли', id FROM birds_class WHERE name_en = 'Gruidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Dūkuri', 'Podiceps', 'Поганки', id FROM birds_class WHERE name_en = 'Podicipedidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Erickiņi', 'Phoenicurus', 'Горихвостки', id FROM birds_class WHERE name_en = 'Muscicapidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Gaigalas', 'Bucephala', 'Гоголи', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Garastītes', 'Aegithalos', 'Длиннохвостые синицы', id FROM birds_class WHERE name_en = 'Aegithalidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Gauras', 'Mergus', 'Крохали', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Griezes', 'Crex', 'Коростели', id FROM birds_class WHERE name_en = 'Rallidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Gulbji', 'Cygnus', 'Лебеди', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Gārņi', 'Ardea', 'Цапли', id FROM birds_class WHERE name_en = 'Ardeidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Jūras kraukļi', 'Phalacrocorax', 'Бакланы', id FROM birds_class WHERE name_en = 'Phalacrocoracidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Jūras pīles', 'Melanitta', 'Турпаны', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Jūras ērgļi', 'Haliaeetus', 'Орланы', id FROM birds_class WHERE name_en = 'Accipitridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Kaijas', 'Larus', 'Чайки', id FROM birds_class WHERE name_en = 'Laridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Kaņepīši', 'Linaria', 'Коноплянки', id FROM birds_class WHERE name_en = 'Fringillidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Klijāni', 'Buteo', 'Настоящие канюки', id FROM birds_class WHERE name_en = 'Accipitridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Koku ķauķi', 'Hippolais', 'Пересмешки', id FROM birds_class WHERE name_en = 'Acrocephalidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Kovārņi', 'Coloeus', 'Галки', id FROM birds_class WHERE name_en = 'Corvidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Košie mušķērāji', 'Ficedula', 'Пёстрые мухоловки', id FROM birds_class WHERE name_en = 'Muscicapidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Krāšņgalvīši', 'Regulus', 'Корольки', id FROM birds_class WHERE name_en = 'Regulidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Kuitalas', 'Numenius', 'Кроншнепы', id FROM birds_class WHERE name_en = 'Scolopacidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Kākauļi', 'Clangula', 'Морянки', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Kāpelētājķauķi', 'Acrocephalus', 'Настоящие камышовки', id FROM birds_class WHERE name_en = 'Acrocephalidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Lauku cīruļi', 'Alauda', 'Полевые жаворонки', id FROM birds_class WHERE name_en = 'Alaudidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Lauči', 'Fulica', 'Лысухи', id FROM birds_class WHERE name_en = 'Rallidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Lielie zīriņi', 'Hydroprogne', 'Чегравы', id FROM birds_class WHERE name_en = 'Laridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Lijas', 'Circus', 'Луни', id FROM birds_class WHERE name_en = 'Accipitridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Mazie dzeņi', 'Dryobates', 'Трёхпалые дятлы', id FROM birds_class WHERE name_en = 'Picidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Mazās gauras', 'Mergellus', 'Лутки', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Melnās dzilnas', 'Dryocopus', 'Желны', id FROM birds_class WHERE name_en = 'Picidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Melnās zosis', 'Branta', 'Казарки', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Meža pīles', 'Anas', 'Речные утки', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Mazās peldpīles', 'Mareca', 'Свиязи', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Platjnābji', 'Spatula', 'Spatula', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Meža zīlītes', 'Periparus', 'Periparus', id FROM birds_class WHERE name_en = 'Paridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Mežastrazdi', 'Turdus', 'Настоящие дрозды', id FROM birds_class WHERE name_en = 'Turdidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Mizložņas', 'Certhia', 'Пищухи', id FROM birds_class WHERE name_en = 'Certhiidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Mušķērāji', 'Muscicapa', 'Настоящие мухоловки', id FROM birds_class WHERE name_en = 'Muscicapidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Mērkaziņas', 'Gallinago', 'Бекасы', id FROM birds_class WHERE name_en = 'Scolopacidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Nirējpīles', 'Aythya', 'Чернети', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Paceplīši', 'Troglodytes', 'Настоящие крапивники', id FROM birds_class WHERE name_en = 'Troglodytidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Pelēkās zosis', 'Anser', 'Гуси', id FROM birds_class WHERE name_en = 'Anatidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Pelēkās zīlītes', 'Poecile', 'Гаички', id FROM birds_class WHERE name_en = 'Paridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Piekūni', 'Falco', 'Соколы', id FROM birds_class WHERE name_en = 'Falconidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Pupuķi', 'Upupa', 'Удоды', id FROM birds_class WHERE name_en = 'Upupidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Purva zīriņi', 'Chlidonias', 'Болотные крачки', id FROM birds_class WHERE name_en = 'Laridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Pūslīši', 'Phalaropus', 'Плосконосые плавунчики', id FROM birds_class WHERE name_en = 'Scolopacidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Raibie dzeņi', 'Dendrocopos', 'Пёстрые дятлы', id FROM birds_class WHERE name_en = 'Picidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Rubeņi', 'Lyrurus', 'Тетерева', id FROM birds_class WHERE name_en = 'Phasianidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Sarkanie svilpji', 'Carpodacus', 'Чечевицы', id FROM birds_class WHERE name_en = 'Fringillidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Sarkanrīklītes', 'Erithacus', 'Зарянки', id FROM birds_class WHERE name_en = 'Muscicapidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Sila cīruļi', 'Lullula', 'Лесные жаворонки', id FROM birds_class WHERE name_en = 'Alaudidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Sisinātājķauķi', 'Locustella', 'Сверчки', id FROM birds_class WHERE name_en = 'Locustellidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Slokas', 'Scolopax', 'Вальдшнепы', id FROM birds_class WHERE name_en = 'Scolopacidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Smiltāju čakstītes', 'Oenanthe', 'Каменки', id FROM birds_class WHERE name_en = 'Muscicapidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Somzīlītes', 'Remiz', 'Ремезы', id FROM birds_class WHERE name_en = 'Remizidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Strazdi', 'Sturnus', 'Скворцы', id FROM birds_class WHERE name_en = 'Sturnidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Stārķi', 'Ciconia', 'Аисты', id FROM birds_class WHERE name_en = 'Ciconiidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Stērstes', 'Emberiza', 'Настоящие овсянки', id FROM birds_class WHERE name_en = 'Emberizidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Svilpji', 'Pyrrhula', 'Снегири', id FROM birds_class WHERE name_en = 'Fringillidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Svīres', 'Apus', 'Стрижи', id FROM birds_class WHERE name_en = 'Apodidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Sīļi', 'Garrulus', 'Сойки', id FROM birds_class WHERE name_en = 'Corvidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Tilbītes', 'Tringa', 'Улиты', id FROM birds_class WHERE name_en = 'Scolopacidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Tārtiņi', 'Charadrius', 'Зуйки', id FROM birds_class WHERE name_en = 'Charadriidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Tītiņi', 'Jynx', 'Вертишейки', id FROM birds_class WHERE name_en = 'Picidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Upes tilbītes', 'Actitis', 'Перевозчики', id FROM birds_class WHERE name_en = 'Scolopacidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Vanagu ģints', 'Accipiter', 'Настоящие ястребы', id FROM birds_class WHERE name_en = 'Accipitridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Vidējie dzeņi', 'Dendrocoptes', 'Пёстрые дятлы', id FROM birds_class WHERE name_en = 'Picidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Vidējie ērgļi', 'Clanga', 'Орлы', id FROM birds_class WHERE name_en = 'Accipitridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Vārnas', 'Corvus', 'Вороны', id FROM birds_class WHERE name_en = 'Corvidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zaļās dzilnas', 'Picus', 'Зелёные дятлы', id FROM birds_class WHERE name_en = 'Picidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zaļās vārnas', 'Coracias', 'Сизоворонки', id FROM birds_class WHERE name_en = 'Coraciidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zaļžubītes', 'Chloris', 'Щеглы', id FROM birds_class WHERE name_en = 'Fringillidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zilzīlītes', 'Cyanistes', 'Лазоревки', id FROM birds_class WHERE name_en = 'Paridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zivju dzenīši', 'Alcedo', 'Зимородки', id FROM birds_class WHERE name_en = 'Alcedinidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zvirbuļi', 'Passer', 'Настоящие воробьи', id FROM birds_class WHERE name_en = 'Passeridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zīlīšu ģints', 'Parus', 'Синицы', id FROM birds_class WHERE name_en = 'Paridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Zīriņi', 'Sterna', 'Крачки', id FROM birds_class WHERE name_en = 'Laridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Čakstes', 'Lanius', 'Сорокопуты', id FROM birds_class WHERE name_en = 'Laniidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Čakstītes', 'Saxicola', 'Чеканы', id FROM birds_class WHERE name_en = 'Muscicapidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Čipstes', 'Anthus', 'Коньки', id FROM birds_class WHERE name_en = 'Motacillidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Čurkstes', 'Delichon', 'Городские ласточки', id FROM birds_class WHERE name_en = 'Hirundinidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ģirliči', 'Serinus', 'Канареечные вьюрки', id FROM birds_class WHERE name_en = 'Fringillidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Īstās pūces', 'Strix', 'Неясыти', id FROM birds_class WHERE name_en = 'Strigidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ķauķi', 'Curruca', 'Славки', id FROM birds_class WHERE name_en = 'Sylviidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ķauķi', 'Sylvia', 'Славки', id FROM birds_class WHERE name_en = 'Sylviidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ķauķīši', 'Phylloscopus', 'Пеночки', id FROM birds_class WHERE name_en = 'Phylloscopidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ķivuļi', 'Spinus', 'Чижи', id FROM birds_class WHERE name_en = 'Fringillidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ķīri', 'Chroicocephalus', 'Chroicocephalus', id FROM birds_class WHERE name_en = 'Laridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ķīvītes', 'Vanellus', 'Чибисы', id FROM birds_class WHERE name_en = 'Charadriidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ķīķi', 'Pernis', 'Настоящие осоеды', id FROM birds_class WHERE name_en = 'Accipitridae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Šņibīši', 'Calidris', 'Песочники', id FROM birds_class WHERE name_en = 'Scolopacidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Ūdensvistiņas', 'Gallinula', 'Камышницы', id FROM birds_class WHERE name_en = 'Rallidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Žagatu ģints', 'Pica', 'Сороки', id FROM birds_class WHERE name_en = 'Corvidae'`)
  pgm.sql(`INSERT INTO birds_class (name_lv, name_en, name_ru, parent)
    SELECT 'Žubītes', 'Fringilla', 'Зяблики', id FROM birds_class WHERE name_en = 'Fringillidae'`)
}

exports.down = pgm => {}
