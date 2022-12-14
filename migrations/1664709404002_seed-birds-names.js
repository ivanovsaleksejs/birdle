/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {

  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Akmeņčakstīte', 'Northern wheatear', 'Oenanthe oenanthe', 'Обыкновенная каменка', id FROM birds_class WHERE name_en = 'Oenanthe' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Baltā cielava', 'White wagtail', 'Motacilla alba', 'Белая трясогузка', id FROM birds_class WHERE name_en = 'Motacilla' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Baltais gārnis', 'Great white egret', 'Ardea alba', 'Большая белая цапля', id FROM birds_class WHERE name_en = 'Ardea' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Baltais stārķis', 'White stork', 'Ciconia ciconia', 'Белый аист', id FROM birds_class WHERE name_en = 'Ciconia' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Baltmugurdzenis', 'White-backed woodpecker', 'Dendrocopos leucotos', 'Белоспинный дятел', id FROM birds_class WHERE name_en = 'Dendrocopos' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Baltpieres zoss', 'Greater white-fronted goose', 'Anser albifrons', 'Белолобый гусь', id FROM birds_class WHERE name_en = 'Anser' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Baltvaigu zoss', 'Barnacle goose', 'Branta leucopsis', 'Белощёкая казарка', id FROM birds_class WHERE name_en = 'Branta' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Baltvēderis', 'Eurasian wigeon', 'Mareca penelope', 'Свиязь', id FROM birds_class WHERE name_en = 'Mareca' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Bezdelīga', 'Barn swallow', 'Hirundo rustica', 'Деревенская ласточка', id FROM birds_class WHERE name_en = 'Hirundo' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Bezdelīgu piekūns', 'Eurasian hobby', 'Falco subbuteo', 'Чеглок', id FROM birds_class WHERE name_en = 'Falco' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Bikšainais klijāns', 'Rough-legged Buzzard', 'Buteo lagopus', 'Мохноногий канюк', id FROM birds_class WHERE name_en = 'Buteo' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Brūnā čakste', 'Red-backed shrike', 'Lanius collurio', 'Обыкновенный жулан', id FROM birds_class WHERE name_en = 'Lanius' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Brūnkaklis', 'Common pochard', 'Aythya ferina', 'Красноголовый нырок', id FROM birds_class WHERE name_en = 'Aythya' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Brūnspārnu ķauķis', 'Common Whitethroat', 'Curruca communis', 'Серая славка', id FROM birds_class WHERE name_en = 'Curruca' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Cekuldūkuris', 'Great crested grebe', 'Podiceps cristatus', 'Чомга', id FROM birds_class WHERE name_en = 'Podiceps' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Cekulpīle', 'Tufted duck ', 'Aythya fuligula', 'Хохлатая чернеть', id FROM birds_class WHERE name_en = 'Aythya' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Cekulzīlīte', 'Crested tit', 'Lophophanes cristatus', 'Гренадёрка', id FROM birds_class WHERE name_en = 'Lophophanes' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Cekulzīriņš', 'Sandwich tern', 'Thalasseus sandvicensis', 'Пестроносая крачка', id FROM birds_class WHERE name_en = 'Thalasseus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Ceru ķauķis', 'Sedge warbler', 'Acrocephalus schoenobaenus', 'Камышовка-барсучок', id FROM birds_class WHERE name_en = 'Acrocephalus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Čuņčiņš', 'Common chiffchaff', 'Phylloscopus collybita', 'Пеночка-теньковка', id FROM birds_class WHERE name_en = 'Phylloscopus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Dadzītis', 'European goldfinch', 'Carduelis carduelis', 'Черноголовый щегол', id FROM birds_class WHERE name_en = 'Carduelis' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Dižraibais dzenis ', 'Great spotted woodpecker', 'Dendrocopos major', 'Большой пёстрый дятел', id FROM birds_class WHERE name_en = 'Dendrocopos' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Dzeltenā cielava', 'Western yellow wagtail', 'Motacilla flava', 'Жёлтая трясогузка', id FROM birds_class WHERE name_en = 'Motacilla' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Dzeltenā stērste', 'Yellowhammer', 'Emberiza citrinella', 'Обыкновенная овсянка', id FROM birds_class WHERE name_en = 'Emberiza' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Dzērve', 'Common crane', 'Grus grus', 'Серый журавль', id FROM birds_class WHERE name_en = 'Grus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Dziedātājstrazds', 'Song thrush', 'Turdus philomelos', 'Певчий дрозд', id FROM birds_class WHERE name_en = 'Turdus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Dzilnītis', 'Eurasian nuthatch', 'Sitta europaea', 'Обыкновенный поползень', id FROM birds_class WHERE name_en = 'Sitta' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Erickiņš', 'Common redstart', 'Phoenicurus phoenicurus', 'Горихвостка-лысушка', id FROM birds_class WHERE name_en = 'Phoenicurus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Gaigala', 'Common goldeneye', 'Bucephala clangula', 'Гоголь', id FROM birds_class WHERE name_en = 'Bucephala' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Gaišais ķauķis', 'Lesser whitethroat', 'Curruca curruca', 'Славка-мельничек', id FROM birds_class WHERE name_en = 'Curruca' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Gaišais šņibītis', 'Sanderling', 'Calidris alba', 'Песчанка', id FROM birds_class WHERE name_en = 'Calidris' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Garastīte', 'Long-tailed tit', 'Aegithalos caudatus', 'Длиннохвостая синица', id FROM birds_class WHERE name_en = 'Aegithalos' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Garkaklis', 'Northern pintail', 'Anas acuta', 'Шилохвость', id FROM birds_class WHERE name_en = 'Anas' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Ģirlicis', 'European serin', 'Serinus serinus', 'Канареечный вьюрок', id FROM birds_class WHERE name_en = 'Serinus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Grieze', 'Corn crake', 'Crex crex', 'Коростель', id FROM birds_class WHERE name_en = 'Crex' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Gugatnis', 'Ruff', 'Calidris pugnax', 'Турухтан', id FROM birds_class WHERE name_en = 'Calidris' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Iedzeltenais ķauķis', 'Icterine warbler', 'Hippolais icterina', 'Зелёная пересмешка', id FROM birds_class WHERE name_en = 'Hippolais' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Jūras ērglis', 'White-tailed eagle', 'Haliaeetus albicilla', 'Орлан-белохвост', id FROM birds_class WHERE name_en = 'Haliaeetus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Jūraskrauklis', 'Great cormorant', 'Phalacrocorax carbo', 'Большой баклан', id FROM birds_class WHERE name_en = 'Phalacrocorax' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Kajaks', 'Common gull', 'Larus canus', 'Сизая чайка', id FROM birds_class WHERE name_en = 'Larus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Kākaulis', 'Long-tailed Duck', 'Clangula hyemalis', 'Морянка', id FROM birds_class WHERE name_en = 'Clangula' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Kanādas zoss', 'Canada goose', 'Branta canadensis', 'Канадская казарка', id FROM birds_class WHERE name_en = 'Branta' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Kaņepītis', 'Common linnet', 'Linaria cannabina', 'Коноплянка', id FROM birds_class WHERE name_en = 'Linaria' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Ķīķis', 'European honey buzzard', 'Pernis apivorus', 'Осоед', id FROM birds_class WHERE name_en = 'Pernis' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Ķīvīte', 'Northern lapwing', 'Vanellus vanellus', 'Чибис пигалица', id FROM birds_class WHERE name_en = 'Vanellus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Ķivulis', 'Eurasian siskin', 'Spinus spinus', 'Чиж', id FROM birds_class WHERE name_en = 'Spinus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Koku čipste', 'Tree pipit', 'Anthus trivialis', 'Лесной конёк', id FROM birds_class WHERE name_en = 'Anthus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Kovārnis', 'Western jackdaw', 'Coloeus monedula', 'Галка', id FROM birds_class WHERE name_en = 'Coloeus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Krauķis', 'Rook', 'Corvus frugilegus', 'Грач', id FROM birds_class WHERE name_en = 'Corvus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Krauklis', 'Common raven', 'Corvus corax', 'Ворон', id FROM birds_class WHERE name_en = 'Corvus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Krīklis', 'Eurasian teal', 'Anas crecca', 'Чирок-свистунок', id FROM birds_class WHERE name_en = 'Anas' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Krūmu ķauķis', 'Blyth''s reed warbler', 'Acrocephalus dumetorum', 'Садовая камышовка', id FROM birds_class WHERE name_en = 'Acrocephalus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Kuitala', 'Eurasian curlew', 'Numenius arquata', 'Большой кроншнеп', id FROM birds_class WHERE name_en = 'Numenius' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Kukaiņu piekūns', 'Red-footed falcon', 'Falco vespertinus', 'Кобчик', id FROM birds_class WHERE name_en = 'Falco' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Laucis', 'Eurasian coot', 'Fulica atra', 'Лысуха', id FROM birds_class WHERE name_en = 'Fulica' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lauku balodis', 'Common wood pigeon', 'Columba palumbus', 'Вяхирь', id FROM birds_class WHERE name_en = 'Columba' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lauku cīrulis', 'Eurasian skylark', 'Alauda arvensis', 'Полевой жаворонок', id FROM birds_class WHERE name_en = 'Alauda' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lauku lija', 'Hen harrier', 'Circus cyaneus', 'Полевой лунь', id FROM birds_class WHERE name_en = 'Circus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lauku piekūns', 'Common kestrel', 'Falco tinnunculus', 'Обыкновенная пустельга', id FROM birds_class WHERE name_en = 'Falco' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lauku zvirbulis', 'Eurasian tree sparrow', 'Passer montanus', 'Полевой воробей', id FROM birds_class WHERE name_en = 'Passer' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lielā čakste', 'Great grey shrike', 'Lanius excubitor', 'Серый сорокопут', id FROM birds_class WHERE name_en = 'Lanius' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lielā gaura', 'Common merganser', 'Mergus merganser', 'Большой крохаль', id FROM birds_class WHERE name_en = 'Mergus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lielā tilbīte ', 'Common greenshank', 'Tringa nebularia', 'Большой улит', id FROM birds_class WHERE name_en = 'Tringa' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lielā zīlīte', 'Great tit', 'Parus major', 'Большая синица', id FROM birds_class WHERE name_en = 'Parus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lielais dumpis', 'Eurasian bittern', 'Botaurus stellaris', 'Большая выпь', id FROM birds_class WHERE name_en = 'Botaurus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lielais ķīris', 'Black-headed gull', 'Chroicocephalus ridibundus', 'Озёрная чайка', id FROM birds_class WHERE name_en = 'Chroicocephalus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lielais zīriņš', 'Caspian tern', 'Hydroprogne caspia', 'Чеграва', id FROM birds_class WHERE name_en = 'Hydroprogne' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Lukstu čakstīte', 'Whinchat', 'Saxicola rubetra', 'Луговой чекан', id FROM birds_class WHERE name_en = 'Saxicola' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mājas balodis', 'Feral pigeon', 'Columba livia domestica', 'Сизый голубь', id FROM birds_class WHERE name_en = 'Columba' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mājas čurkste', 'Common house martin', 'Delichon urbicum', 'Городская ласточка', id FROM birds_class WHERE name_en = 'Delichon' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mājas strazds', 'Common starling', 'Sturnus vulgaris', 'Обыкновенный скворец', id FROM birds_class WHERE name_en = 'Sturnus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mājas zvirbulis', 'House sparrow', 'Passer domesticus', 'Домовый воробей', id FROM birds_class WHERE name_en = 'Passer' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mazā gaura', 'Smew', 'Mergellus albellus', 'Луток малый крохаль', id FROM birds_class WHERE name_en = 'Mergellus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mazais dzenis', 'Lesser spotted woodpecker', 'Dryobates minor', 'Малый пёстрый дятел', id FROM birds_class WHERE name_en = 'Dryobates' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mazais ērglis', 'Lesser spotted eagle', 'Clanga pomarina', 'Малый подорлик', id FROM birds_class WHERE name_en = 'Clanga' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mazais gulbis', 'Tundra Swan', 'Cygnus columbianus bewickii', 'Малый лебедь', id FROM birds_class WHERE name_en = 'Cygnus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mazais svilpis', 'Common rosefinch', 'Carpodacus erythrinus', 'Обыкновенная чечевица', id FROM birds_class WHERE name_en = 'Carpodacus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Melnā dzilna', 'Black woodpecker', 'Dryocopus martius', 'Желна чёрный дятел', id FROM birds_class WHERE name_en = 'Dryocopus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Melnais erickiņš', 'Black redstart', 'Phoenicurus ochruros', 'Горихвостка-чернушка', id FROM birds_class WHERE name_en = 'Phoenicurus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Melnais mežastrazds', 'Eurasian blackbird', 'Turdus merula', 'Чёрный дрозд', id FROM birds_class WHERE name_en = 'Turdus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Melnais mušķērājs', 'European pied flycatcher', 'Ficedula hypoleuca', 'Мухоловка-пеструшка', id FROM birds_class WHERE name_en = 'Ficedula' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Melnais zīriņš', 'Black Tern', 'Chlidonias niger', 'Чёрная болотная крачка', id FROM birds_class WHERE name_en = 'Chlidonias' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Melngalvas ķauķis', 'Eurasian blackcap', 'Sylvia atricapilla', 'Славка-черноголовка', id FROM birds_class WHERE name_en = 'Sylvia' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Melnspārnu kaija', 'Great black-backed gull', 'Larus marinus', 'Морская чайка', id FROM birds_class WHERE name_en = 'Larus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mērkaziņa', 'Common snipe', 'Gallinago gallinago', 'Бекас', id FROM birds_class WHERE name_en = 'Gallinago' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Meža balodis', 'Stock dove', 'Columba oenas', 'Клинтух', id FROM birds_class WHERE name_en = 'Columba' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Meža pīle', 'Mallard', 'Anas platyrhynchos', 'Кряква', id FROM birds_class WHERE name_en = 'Anas' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Meža pūce', 'Tawny Owl', 'Strix aluco', 'Серая неясыть', id FROM birds_class WHERE name_en = 'Strix' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Meža tilbīte', 'Green sandpiper', 'Tringa ochropus', 'Черныш', id FROM birds_class WHERE name_en = 'Tringa' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Meža zoss', 'Greylag goose', 'Anser anser', 'Серый гусь', id FROM birds_class WHERE name_en = 'Anser' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Mizložņa', 'Eurasian treecreeper', 'Certhia familiaris', 'Обыкновенная пищуха', id FROM birds_class WHERE name_en = 'Certhia' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Niedru lija', 'Western marsh harrier', 'Circus aeruginosus', 'Болотный лунь', id FROM birds_class WHERE name_en = 'Circus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Niedru stērste', 'Common reed bunting', 'Emberiza schoeniclus', 'Камышовая овсянка', id FROM birds_class WHERE name_en = 'Emberiza' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Niedru strazds', 'Great reed warbler', 'Acrocephalus arundinaceus', 'Дроздовидная камышовка', id FROM birds_class WHERE name_en = 'Acrocephalus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Paceplītis', 'Eurasian wren', 'Troglodytes troglodytes', 'Крапивник подкоренник', id FROM birds_class WHERE name_en = 'Troglodytes' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Parastais šņibītis', 'Dunlin', 'Calidris alpina', 'Чернозобик', id FROM birds_class WHERE name_en = 'Calidris' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Paugurknābja gulbis', 'Mute swan', 'Cygnus olor', 'Лебедь-шипун', id FROM birds_class WHERE name_en = 'Cygnus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Pelēkā dzilna', 'Grey-headed woodpecker', 'Picus canus', 'Седой дятел', id FROM birds_class WHERE name_en = 'Picus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Pelēkā pīle', 'Gadwall', 'Mareca strepera', 'Серая утка', id FROM birds_class WHERE name_en = 'Mareca' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Pelēkā vārna', 'Hooded crow', 'Corvus cornix', 'Серая ворона', id FROM birds_class WHERE name_en = 'Corvus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Pelēkā zīlīte', 'Willow tit', 'Poecile montanus', 'Пухляк', id FROM birds_class WHERE name_en = 'Poecile' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Pelēkais mušķērājs', 'Spotted flycatcher', 'Muscicapa striata', 'Серая мухоловка', id FROM birds_class WHERE name_en = 'Muscicapa' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Pelēkais strazds', 'Fieldfare', 'Turdus pilaris', 'Рябинник', id FROM birds_class WHERE name_en = 'Turdus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Pelēkvaigu dūkuris', 'Red-necked grebe', 'Podiceps grisegena', 'Серощёкая поганка', id FROM birds_class WHERE name_en = 'Podiceps' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Peļu klijāns', 'Common buzzard', 'Buteo buteo', 'Обыкновенный канюк', id FROM birds_class WHERE name_en = 'Buteo' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Platknābis', 'Northern shoveler', 'Spatula clypeata', 'Широконоска', id FROM birds_class WHERE name_en = 'Spatula' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Pļavu čipste', 'Meadow pipit', 'Anthus pratensis', 'Луговой конек', id FROM birds_class WHERE name_en = 'Anthus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Plukšķis', 'Redwing', 'Turdus iliacus', 'Белобровик', id FROM birds_class WHERE name_en = 'Turdus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Prīkšķe', 'Garganey', 'Spatula querquedula', 'Чирок-трескунок', id FROM birds_class WHERE name_en = 'Spatula' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Pupuķis', 'Eurasian hoopoe', 'Upupa epops', 'Удод ', id FROM birds_class WHERE name_en = 'Upupa' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Purva ķauķis', 'Marsh warbler', 'Acrocephalus palustris', 'Болотная камышовка', id FROM birds_class WHERE name_en = 'Acrocephalus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Purva tilbīte', 'Wood sandpiper', 'Tringa glareola', 'Фифи', id FROM birds_class WHERE name_en = 'Tringa' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Purva zīlīte', 'Marsh tit', 'Poecile palustris', 'Черноголовая гаичка', id FROM birds_class WHERE name_en = 'Poecile' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Reņģu kaija', 'Lesser black-backed gull', 'Larus fuscus', 'Клуша', id FROM birds_class WHERE name_en = 'Larus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Rubenis', 'Black grouse', 'Lyrurus tetrix', 'Те́терев', id FROM birds_class WHERE name_en = 'Lyrurus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Sāmsalas dižpīle', 'Common shelduck', 'Tadorna tadorna', 'Пеганка', id FROM birds_class WHERE name_en = 'Tadorna' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Sarkanrīklīte', 'European robin', 'Erithacus rubecula', 'Зарянка', id FROM birds_class WHERE name_en = 'Erithacus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Sārtgalvītis', 'Common firecrest', 'Regulus ignicapilla', 'Красноголовый королёк', id FROM birds_class WHERE name_en = 'Regulus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Šaurknābja pūslītis', 'Red-necked phalarope', 'Phalaropus lobatus', 'Круглоносый плавунчик', id FROM birds_class WHERE name_en = 'Phalaropus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Sila cīrulis', 'Woodlark', 'Lullula arborea', 'Лесной жаворонок', id FROM birds_class WHERE name_en = 'Lullula' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Sila strazds', 'Mistle thrush', 'Turdus viscivorus', 'Деряба', id FROM birds_class WHERE name_en = 'Turdus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Sīlis', 'Eurasian jay', 'Garrulus glandarius', 'Сойка', id FROM birds_class WHERE name_en = 'Garrulus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Sloka', 'Eurasian woodcock', 'Scolopax rusticola', 'Вальдшнеп', id FROM birds_class WHERE name_en = 'Scolopax' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Smilšu tārtiņš', 'Common ringed plover', 'Charadrius hiaticula', 'Галстучник', id FROM birds_class WHERE name_en = 'Charadrius' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Somzīlīte', 'Eurasian penduline tit', 'Remiz pendulinus', 'Ремез', id FROM birds_class WHERE name_en = 'Remiz' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Sudrabkaija', 'European herring gull', 'Larus argentatus', 'Серебристая чайка', id FROM birds_class WHERE name_en = 'Larus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Svilpis', 'Eurasian bullfinch', 'Pyrrhula pyrrhula', 'Снегирь', id FROM birds_class WHERE name_en = 'Pyrrhula' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Svīre', 'Common Swift', 'Apus apus', 'Чёрный стриж', id FROM birds_class WHERE name_en = 'Apus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Svirlītis', 'Wood warbler', 'Phylloscopus sibilatrix', 'Пеночка-трещотка', id FROM birds_class WHERE name_en = 'Phylloscopus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Tītiņš', 'Eurasian wryneck', 'Jynx torquilla', 'Вертишейка', id FROM birds_class WHERE name_en = 'Jynx' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Trulītis', 'Little stint', 'Calidris minuta', 'Кулик-воробей', id FROM birds_class WHERE name_en = 'Calidris' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Tumšā pīle', 'Velvet scoter', 'Melanitta fusca', 'Турпан', id FROM birds_class WHERE name_en = 'Melanitta' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Tundras sējas zoss', 'Tundra Bean Goose', 'Anser serrirostris rossicus', 'Тундровый гуменник', id FROM birds_class WHERE name_en = 'Anser' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Ūdensvistiņa', 'Common Moorhen', 'Gallinula chloropus', 'Камышница', id FROM birds_class WHERE name_en = 'Gallinula' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Upes ķauķis', 'River warbler', 'Locustella fluviatilis', 'Речной сверчок', id FROM birds_class WHERE name_en = 'Locustella' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Upes tārtiņš ', 'Little ringed plover', 'Charadrius dubius', 'Малый зуёк', id FROM birds_class WHERE name_en = 'Charadrius' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Upes tilbīte', 'Common sandpiper', 'Actitis hypoleucos', 'Перевозчик', id FROM birds_class WHERE name_en = 'Actitis' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Upes zīriņš', 'Common tern', 'Sterna hirundo', 'Речная крачка', id FROM birds_class WHERE name_en = 'Sterna' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Vidējais dzenis', 'Middle spotted woodpecker', 'Dendrocoptes medius', 'Средний пёстрый дятел', id FROM birds_class WHERE name_en = 'Dendrocoptes' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Vistu vanags', 'Northern goshawk', 'Accipiter gentilis', 'Тетеревятник', id FROM birds_class WHERE name_en = 'Accipiter' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Vītītis', 'Willow warbler', 'Phylloscopus trochilus', 'Пеночка-весничка', id FROM birds_class WHERE name_en = 'Phylloscopus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Žagata', 'Eurasian magpie', 'Pica pica', 'Сорока', id FROM birds_class WHERE name_en = 'Pica' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Zaļā vārna ', 'European roller', 'Coracias garrulus', 'Сизоворонка', id FROM birds_class WHERE name_en = 'Coracias' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Zaļžubīte', 'European greenfinch', 'Chloris chloris', 'Зеленушка', id FROM birds_class WHERE name_en = 'Chloris' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Zeltgalvītis', 'Common goldcrest', 'Regulus regulus', 'Желтоголовый королёк', id FROM birds_class WHERE name_en = 'Regulus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Ziemas žubīte', 'Brambling', 'Fringilla montifringilla', 'Вьюрок', id FROM birds_class WHERE name_en = 'Fringilla' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Ziemeļu gulbis', 'Whooper swan', 'Cygnus cygnus', 'Лебедь-кликун', id FROM birds_class WHERE name_en = 'Cygnus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Zilzīlīte', 'Eurasian blue tit', 'Cyanistes caeruleus', 'Обыкновенная лазоревка', id FROM birds_class WHERE name_en = 'Cyanistes' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Zivju dzenītis', 'Common kingfisher ', 'Alcedo atthis', 'Обыкновенный зимородок', id FROM birds_class WHERE name_en = 'Alcedo' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Zivju gārnis', 'Grey heron', 'Ardea cinerea', 'Серая цапля', id FROM birds_class WHERE name_en = 'Ardea' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Žubīte', 'Common chaffinch', 'Fringilla coelebs', 'Зяблик', id FROM birds_class WHERE name_en = 'Fringilla' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Bārdzīlīte', 'Bearded reedling', 'Panurus biarmicus', 'Усатая синица', id FROM birds_class WHERE name_en = 'Panurus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Meža zīlīte', 'Coal tit', 'Periparus ater', 'Московка', id FROM birds_class WHERE name_en = 'Periparus' LIMIT 1`)
  pgm.sql(`INSERT INTO birds_names (name_lv, name_en, name_lat, name_ru, genus)
    SELECT 'Jūras ķīvīte', 'Grey plover', 'Pluvialis squatarola', 'Тулес', id FROM birds_class WHERE name_en = 'Pluvialis' LIMIT 1`)
}

exports.down = pgm => {}
