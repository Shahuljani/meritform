import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

// ─── State → City mapping (complete) ─────────────────────────────────────────
const STATE_CITY_MAP = {
  "26909": {
    label: "Andaman and Nicobar",
    cities: [
      { value: "26911", label: "Car Nicobar" },
      { value: "34396", label: "Digipur" },
      { value: "26914", label: "Diglipur" },
      { value: "26918", label: "Ferrargunj" },
      { value: "26919", label: "Hut Bay" },
      { value: "26915", label: "Mayabunder" },
      { value: "26912", label: "Nancowry" },
      { value: "34395", label: "Port Blair" },
      { value: "26916", label: "Rangat" },
    ],
  },
  "26920": {
    label: "Andhra Pradesh",
    cities: [
      { value: "27239", label: "A.Konduru" },
      { value: "27050", label: "Aalamuru" },
      { value: "27113", label: "Achampet" },
      { value: "27513", label: "Achanta" },
      { value: "27389", label: "Addanki" },
      { value: "27051", label: "Addateegala" },
      { value: "27291", label: "Adoni" },
      { value: "26922", label: "Agali" },
      { value: "27240", label: "Agiripalli" },
      { value: "27052", label: "Ainavilli" },
      { value: "27514", label: "Akividu" },
      { value: "26988", label: "Akkurthi" },
      { value: "27241", label: "Akunuru" },
      { value: "27477", label: "Alamanda" },
      { value: "27053", label: "Alamuru" },
      { value: "34412", label: "Allagadda" },
      { value: "27054", label: "Allavaram" },
      { value: "34413", label: "Alluru" },
      { value: "26923", label: "Amadagur" },
      { value: "27417", label: "Amadalavalasa" },
      { value: "34414", label: "Amarapuram" },
      { value: "27114", label: "Amaravathi" },
      { value: "27055", label: "Ambajipeta" },
      { value: "27390", label: "Ambavaram" },
      { value: "27459", label: "Anakapalle" },
      { value: "27325", label: "Anamasamudrampeta" },
      { value: "27460", label: "Anandapuram" },
      { value: "26924", label: "Anantapur" },
      { value: "27461", label: "Ananthagiri" },
      { value: "27326", label: "Ananthasagaram" },
      { value: "27115", label: "Ananthavaram" },
      { value: "27056", label: "Anaparthy" },
      { value: "27327", label: "Anemadugu" },
      { value: "27116", label: "Angalakuduru" },
      { value: "27117", label: "Annavaram" },
      { value: "27118", label: "Appikatla" },
      { value: "27463", label: "Araku" },
      { value: "27391", label: "Ardhaveedu" },
      { value: "27464", label: "Atchutapuram" },
      { value: "27418", label: "Atisurikaviti" },
      { value: "27189", label: "Atlur" },
      { value: "34423", label: "Atmakur" },
      { value: "34422", label: "Atmakur" },
      { value: "34421", label: "Atmakur" },
      { value: "27057", label: "Atreyapuram" },
      { value: "27515", label: "Attili" },
      { value: "27242", label: "Avanigadda" },
      { value: "26989", label: "B.Kothakota" },
      { value: "26990", label: "B.N. Kandriga" },
      { value: "27190", label: "B.P.Rachapalli" },
      { value: "32602", label: "Bachannapet" },
      { value: "27478", label: "Badangi" },
      { value: "27191", label: "Badvel" },
      { value: "27192", label: "Balapanur" },
      { value: "27328", label: "Balayapalli" },
      { value: "27479", label: "Balijipeta" },
      { value: "27292", label: "Banaganapalli" },
      { value: "27293", label: "Bandi Atmakuru" },
      { value: "26991", label: "Bangarupalem" },
      { value: "27119", label: "Bapatla" },
      { value: "34440", label: "Bathalapalle" },
      { value: "27120", label: "Bellamkonda" },
      { value: "26925", label: "Beluguppa" },
      { value: "27392", label: "Bestavaripeta" },
      { value: "27294", label: "Betamcherla" },
      { value: "26992", label: "Bhakarapet" },
      { value: "27419", label: "Bhamini" },
      { value: "27121", label: "Bhattiprolu" },
      { value: "27465", label: "Bheemunipatnam" },
      { value: "27516", label: "Bhimadole" },
      { value: "27517", label: "Bhimavaram" },
      { value: "27480", label: "Bhogapuram" },
      { value: "27058", label: "Bikkavolu" },
      { value: "27243", label: "Billanapalli" },
      { value: "27329", label: "Bitragunta" },
      { value: "27481", label: "Bobbili" },
      { value: "26993", label: "Bokkasam Palem" },
      { value: "27122", label: "Bollapalle" },
      { value: "26926", label: "Bommireddy Cheruvu" },
      { value: "27482", label: "Bonangi" },
      { value: "34461", label: "Bondapalli" },
      { value: "27330", label: "Brahmadevam" },
      { value: "26927", label: "Brahmasamudram" },
      { value: "27331", label: "Buchireddypalem" },
      { value: "26928", label: "Bukkapatnam" },
      { value: "26929", label: "Bukkaraya Samudram" },
      { value: "27420", label: "Burja" },
      { value: "27518", label: "Butteyagudem" },
      { value: "27295", label: "C. Belagal" },
      { value: "27193", label: "C.Rajupalem" },
      { value: "27519", label: "Chagallu" },
      { value: "27332", label: "Chakalakonda" },
      { value: "27194", label: "Chakrayapet" },
      { value: "27244", label: "Challapalli" },
      { value: "27483", label: "Challapeta" },
      { value: "27123", label: "Chandole" },
      { value: "26994", label: "Chandragiri" },
      { value: "27245", label: "Chandralapadu" },
      { value: "27520", label: "Chataparru" },
      { value: "27246", label: "Chatrai" },
      { value: "34470", label: "Chebrolu" },
      { value: "34471", label: "Chebrolu" },
      { value: "27466", label: "Cheedikada" },
      { value: "27484", label: "Cheepurupalli" },
      { value: "27333", label: "Chejerla" },
      { value: "26930", label: "Chennekothapalli" },
      { value: "27195", label: "Chennur" },
      { value: "27124", label: "Cherukupalli" },
      { value: "27125", label: "Cheruvu Madhavaram" },
      { value: "27126", label: "Chilakaluripet" },
      { value: "27421", label: "Chilakapalem" },
      { value: "26931", label: "Chilamathur" },
      { value: "27334", label: "Chillakur" },
      { value: "27393", label: "Chinna Dornala" },
      { value: "26995", label: "Chinna Gotti Gallu" },
      { value: "27422", label: "Chinnajonnavalasa" },
      { value: "27196", label: "Chinnamandem" },
      { value: "34476", label: "Chintalapudi" },
      { value: "27467", label: "Chintapalle" },
      { value: "27197", label: "Chinthakommadinne" },
      { value: "34477", label: "Chirala" },
      { value: "27335", label: "Chittamuru" },
      { value: "26996", label: "Chittecherla" },
      { value: "26997", label: "Chittoor" },
      { value: "27198", label: "Chitvel" },
      { value: "27468", label: "Chodavaram" },
      { value: "27127", label: "Chodayapalem" },
      { value: "26998", label: "Chowdepalle" },
      { value: "27394", label: "Cumbum" },
      { value: "26932", label: "D.Hirehal" },
      { value: "27469", label: "D.Tallavalasa" },
      { value: "27128", label: "Dachepalle" },
      { value: "27336", label: "Dagadarthi" },
      { value: "27337", label: "Dakkili" },
      { value: "26999", label: "Damalcheruvu" },
      { value: "27338", label: "Damavaram" },
      { value: "27521", label: "Darbhagudem" },
      { value: "27522", label: "Denduluru" },
      { value: "34486", label: "Denkada" },
      { value: "27296", label: "Devanakonda" },
      { value: "27523", label: "Deverapalli" },
      { value: "34489", label: "Devipatnam" },
      { value: "27524", label: "Dharmaji Gudem" },
      { value: "26933", label: "Dharmavaram" },
      { value: "27297", label: "Dhone" },
      { value: "27129", label: "Dhulipudi" },
      { value: "27395", label: "Donakonda" },
      { value: "26934", label: "Donnikota" },
      { value: "27339", label: "Doravarichatram" },
      { value: "27298", label: "Dornipadu" },
      { value: "27130", label: "Duggirala" },
      { value: "27131", label: "Durgi" },
      { value: "27340", label: "Duttalur" },
      { value: "34498", label: "Duvvuru" },
      { value: "27525", label: "Dwaraka Tirumala" },
      { value: "27059", label: "East Godavari" },
      { value: "27132", label: "Edlapadu" },
      { value: "34499", label: "Eluru" },
      { value: "27133", label: "Emani" },
      { value: "27423", label: "Etcherla" },
      { value: "27060", label: "Folkspeta" },
      { value: "27061", label: "Gadi Lanka" },
      { value: "27299", label: "Gadivemula" },
      { value: "27485", label: "Gajapatinagaram" },
      { value: "27199", label: "Galiveedu" },
      { value: "27248", label: "Gampalagudem" },
      { value: "27526", label: "Ganapavaram" },
      { value: "27341", label: "Gandavaram" },
      { value: "27062", label: "Gandepalli" },
      { value: "27342", label: "Gandipalem" },
      { value: "26935", label: "Gandlapenta" },
      { value: "27000", label: "Gandupalle" },
      { value: "27001", label: "Gangadhara Nellore" },
      { value: "27063", label: "Gangavaram" },
      { value: "27424", label: "Ganguvarisigadam" },
      { value: "34502", label: "Gannavaram" },
      { value: "27486", label: "Gantyada" },
      { value: "27487", label: "Garividi" },
      { value: "26936", label: "Garladinne" },
      { value: "27488", label: "Garugubilli" },
      { value: "27249", label: "Ghantasala" },
      { value: "27396", label: "Giddalur" },
      { value: "27064", label: "Gokavaram" },
      { value: "27065", label: "Gollaprollu" },
      { value: "27470", label: "Golugonda" },
      { value: "27300", label: "Gonegandla" },
      { value: "26937", label: "Gooty" },
      { value: "27471", label: "Gopalapatnam Rural" },
      { value: "27527", label: "Gopannapalem" },
      { value: "27200", label: "Gopavaram" },
      { value: "26938", label: "Gorantla" },
      { value: "27301", label: "Gospadu" },
      { value: "26939", label: "Gudibanda" },
      { value: "27002", label: "Gudipala" },
      { value: "27250", label: "Gudivada" },
      { value: "27251", label: "Gudlavalleru" },
      { value: "27343", label: "Gudur" },
      { value: "27252", label: "Guduru" },
      { value: "26940", label: "Gummagatta" },
      { value: "27489", label: "Gummalaxmipuram" },
      { value: "27344", label: "Gumparlapadu" },
      { value: "27345", label: "Gundalammapalem" },
      { value: "27528", label: "Gundugolanu" },
      { value: "26941", label: "Guntakal" },
      { value: "27134", label: "Guntur" },
      { value: "27135", label: "Gurazala" },
      { value: "27490", label: "Gurla" },
      { value: "27003", label: "Gurram Konda" },
      { value: "27253", label: "Hanuman Junction" },
      { value: "26942", label: "Herial" },
      { value: "26943", label: "Hindupur" },
      { value: "27425", label: "Hiramandalam" },
      { value: "27254", label: "Ibrahimpatnam" },
      { value: "27426", label: "Ichchapuram" },
      { value: "27136", label: "Inturu" },
      { value: "27137", label: "Ipur" },
      { value: "27530", label: "Iragavaram" },
      { value: "27004", label: "Irala" },
      { value: "27066", label: "Jaggampeta" },
      { value: "27255", label: "Jaggayyapet" },
      { value: "27531", label: "Jaggisetti Gudem" },
      { value: "27346", label: "Jaladanki" },
      { value: "27427", label: "Jalumuru" },
      { value: "27201", label: "Jammalamadugu" },
      { value: "27138", label: "Janapadu" },
      { value: "27532", label: "Jangareddigudem" },
      { value: "27533", label: "Jeelugumilli" },
      { value: "27491", label: "Jiyyammavalasa" },
      { value: "27428", label: "Joduru" },
      { value: "27202", label: "Kadapa" },
      { value: "27067", label: "Kadiam" },
      { value: "26944", label: "Kadiri" },
      { value: "27256", label: "Kaikaluru" },
      { value: "27534", label: "Kaikaram" },
      { value: "27068", label: "Kajuluru" },
      { value: "27069", label: "Kakinada" },
      { value: "27257", label: "Kakulapadu" },
      { value: "27139", label: "Kakumanu" },
      { value: "27005", label: "Kalakada" },
      { value: "27203", label: "Kalasapadu" },
      { value: "27258", label: "Kalidindi" },
      { value: "27347", label: "Kaligiri" },
      { value: "27006", label: "Kalikiri" },
      { value: "27535", label: "Kalla" },
      { value: "27348", label: "Kaluvaya" },
      { value: "34537", label: "Kalyandurg" },
      { value: "27204", label: "Kamalapuram" },
      { value: "27536", label: "Kamavarapu Kota" },
      { value: "26945", label: "Kambadur" },
      { value: "27007", label: "Kambhamvaripalle" },
      { value: "26946", label: "Kammavari Palli" },
      { value: "27140", label: "Kanagala" },
      { value: "26947", label: "Kanaganapalli" },
      { value: "34541", label: "Kandukur" },
      { value: "26948", label: "Kanekal" },
      { value: "27398", label: "Kanigiri" },
      { value: "27008", label: "Kanipakam" },
      { value: "27259", label: "Kankipadu" },
      { value: "27537", label: "Kannapuram" },
      { value: "27070", label: "Kapileswarapuram" },
      { value: "27071", label: "Karapa" },
      { value: "27349", label: "Karatampadu" },
      { value: "27141", label: "Karempudi" },
      { value: "27142", label: "Karlapalem" },
      { value: "27009", label: "Karveti Nagar" },
      { value: "34544", label: "Kasibugga" },
      { value: "27072", label: "Katrenikona" },
      { value: "27260", label: "Katuru" },
      { value: "27350", label: "Kavali" },
      { value: "27429", label: "Kaviti" },
      { value: "27205", label: "Khajipet Sunkesula" },
      { value: "27073", label: "Kirlampudi" },
      { value: "27351", label: "Kodavalur" },
      { value: "27302", label: "Kodumur" },
      { value: "34552", label: "Koduru" },
      { value: "27303", label: "Koilkuntla" },
      { value: "27143", label: "Kolakaluru" },
      { value: "27304", label: "Kolimigundla" },
      { value: "27144", label: "Kollipara" },
      { value: "27145", label: "Kolluru" },
      { value: "27492", label: "Komarada" },
      { value: "27399", label: "Komarolu" },
      { value: "27493", label: "Konada" },
      { value: "27261", label: "Kondapalli" },
      { value: "34553", label: "Kondapuram" },
      { value: "27010", label: "Kondareddy Palle" },
      { value: "27074", label: "Korukonda" },
      { value: "27430", label: "Kotabommali" },
      { value: "27494", label: "Kotagandredu" },
      { value: "27075", label: "Kotananduru" },
      { value: "26949", label: "Kothacheruvu" },
      { value: "27076", label: "Kothapalli" },
      { value: "27077", label: "Kothapeta" },
      { value: "34556", label: "Kothavalasa" },
      { value: "34558", label: "Kotturu" },
      { value: "27352", label: "Kovur" },
      { value: "27538", label: "Kovvali" },
      { value: "27539", label: "Kovvur" },
      { value: "27540", label: "Koyyalagudem" },
      { value: "27247", label: "Krishna" },
      { value: "27146", label: "Krosur" },
      { value: "27262", label: "Kruthivennu" },
      { value: "27147", label: "Kuchinapudi" },
      { value: "27148", label: "Kuchipudi" },
      { value: "26950", label: "Kudair" },
      { value: "26951", label: "Kuderu" },
      { value: "26952", label: "Kundurpi" },
      { value: "27011", label: "Kuppam" },
      { value: "27400", label: "Kurichedu" },
      { value: "27305", label: "Kurnool" },
      { value: "27495", label: "Kurupam" },
      { value: "27541", label: "Lakkavaram" },
      { value: "27496", label: "Lakkavarapu Kota" },
      { value: "27206", label: "Lakkireddipalli" },
      { value: "27263", label: "Lankapalli" },
      { value: "27207", label: "Lavanuru" },
      { value: "27431", label: "Laveru" },
      { value: "27149", label: "Lemalle" },
      { value: "26953", label: "Lepakshi" },
      { value: "27208", label: "Lingala" },
      { value: "27432", label: "Loddalapeta" },
      { value: "27150", label: "Machavaram" },
      { value: "27151", label: "Macherla" },
      { value: "27264", label: "Machilipatnam" },
      { value: "26954", label: "Madakasira" },
      { value: "27012", label: "Madanapalle" },
      { value: "27433", label: "Madanapuram" },
      { value: "27306", label: "Maddikera" },
      { value: "27307", label: "Maddikera East" },
      { value: "27209", label: "Maduru" },
      { value: "27434", label: "Majjigudem" },
      { value: "27497", label: "Makkuva" },
      { value: "26955", label: "Malameedi Kambala Dinne" },
      { value: "27078", label: "Malikipuram" },
      { value: "27210", label: "Malkapuram" },
      { value: "27079", label: "Mamidikududru" },
      { value: "27542", label: "Manchili" },
      { value: "27080", label: "Mandapeta" },
      { value: "27435", label: "Mandasa" },
      { value: "27265", label: "Mandavalli" },
      { value: "27081", label: "Manepalli" },
      { value: "34579", label: "Mangalagiri" },
      { value: "27308", label: "Mantralayam" },
      { value: "27353", label: "Manubolu" },
      { value: "27082", label: "Maredumilli" },
      { value: "27401", label: "Markapur" },
      { value: "27354", label: "Marripadu" },
      { value: "27402", label: "Martur" },
      { value: "27543", label: "Maruteru" },
      { value: "27152", label: "Medikonduru" },
      { value: "27436", label: "Meliaputti" },
      { value: "27498", label: "Mentada" },
      { value: "27499", label: "Merakamudidam" },
      { value: "27544", label: "Mogalturu" },
      { value: "27266", label: "Mopidevi" },
      { value: "27267", label: "Movva" },
      { value: "27545", label: "Moyyeru" },
      { value: "34590", label: "Muddanur" },
      { value: "26956", label: "Mudigubba" },
      { value: "27268", label: "Mudinepalli" },
      { value: "27013", label: "Mulakalacheruvu" },
      { value: "27083", label: "Mummidivaram" },
      { value: "27153", label: "Muppalla" },
      { value: "27014", label: "Murukambattu" },
      { value: "27269", label: "Musunuru" },
      { value: "27355", label: "Muthukur" },
      { value: "27356", label: "Muttukuru" },
      { value: "26957", label: "Mutyala Cheruvu" },
      { value: "27211", label: "Mydukur" },
      { value: "34594", label: "Mylavaram" },
      { value: "27357", label: "Mypadu" },
      { value: "27154", label: "Nadendla" },
      { value: "27358", label: "Nagamambapuram" },
      { value: "27270", label: "Nagayalanka" },
      { value: "27359", label: "Naidupeta" },
      { value: "26958", label: "Nallacheruvu" },
      { value: "27212", label: "Nallaguttapalle" },
      { value: "27546", label: "Nallajerla" },
      { value: "26959", label: "Nallamada" },
      { value: "26960", label: "Nambula Pulakunta" },
      { value: "27155", label: "Namburu" },
      { value: "27213", label: "Nandalur" },
      { value: "27309", label: "Nandavaram" },
      { value: "34597", label: "Nandigama" },
      { value: "27310", label: "Nandikotkur" },
      { value: "27214", label: "Nandimandalam" },
      { value: "27360", label: "Nandipadu" },
      { value: "27271", label: "Nandivada" },
      { value: "27156", label: "Nandivelugu" },
      { value: "27311", label: "Nandyal" },
      { value: "27361", label: "Narampeta" },
      { value: "26961", label: "Narapala" },
      { value: "27437", label: "Narasannapeta" },
      { value: "27157", label: "Narasaraopet" },
      { value: "27015", label: "Narayanavanam" },
      { value: "27547", label: "Narsapur" },
      { value: "27472", label: "Narsipatnam" },
      { value: "27473", label: "Nathavaram" },
      { value: "27158", label: "Nekarikallu" },
      { value: "27362", label: "Nelapattu" },
      { value: "27500", label: "Nellimarla" },
      { value: "27363", label: "Nellore" },
      { value: "27548", label: "Nidadavolu" },
      { value: "27016", label: "Nindra" },
      { value: "27159", label: "Nizampatnam" },
      { value: "27364", label: "North Mopuru" },
      { value: "27365", label: "North Rajupalem" },
      { value: "27160", label: "Nutakki" },
      { value: "27161", label: "Nuzendla" },
      { value: "27272", label: "Nuzividu" },
      { value: "26962", label: "Obuladevaracheruvu" },
      { value: "27215", label: "Obulavaripalli" },
      { value: "27403", label: "Ongole" },
      { value: "27312", label: "Owk" },
      { value: "27501", label: "Pachipenta" },
      { value: "27549", label: "Padapadu" },
      { value: "27474", label: "Paderu" },
      { value: "27313", label: "Pagidyala" },
      { value: "27017", label: "Pakala" },
      { value: "27550", label: "Palakoderu" },
      { value: "27551", label: "Palakollu" },
      { value: "27438", label: "Palakonda" },
      { value: "27018", label: "Palamaner" },
      { value: "27439", label: "Palasa" },
      { value: "27019", label: "Palasamudram" },
      { value: "27502", label: "Palligandredu" },
      { value: "27216", label: "Palugurallapalle Part IV" },
      { value: "34612", label: "Pamarru" },
      { value: "26963", label: "Pamidi" },
      { value: "27314", label: "Pamulapadu" },
      { value: "27020", label: "Pannur" },
      { value: "27315", label: "Panyam" },
      { value: "27404", label: "Parchoor" },
      { value: "26964", label: "Parigi" },
      { value: "27503", label: "Parvathipuram" },
      { value: "27162", label: "Patchalatadiparru" },
      { value: "27085", label: "Patha Gannavaram" },
      { value: "27440", label: "Pathapatnam" },
      { value: "27441", label: "Pathrapada" },
      { value: "27316", label: "Pattikonda" },
      { value: "27163", label: "Pedakakani" },
      { value: "27164", label: "Pedakurapadu" },
      { value: "27504", label: "Pedamajjipalem" },
      { value: "27505", label: "Pedamanapuram" },
      { value: "27273", label: "Pedana" },
      { value: "27165", label: "Pedanandipadu" },
      { value: "27552", label: "Pedapadu" },
      { value: "27166", label: "Pedapalem" },
      { value: "27274", label: "Pedaparupudi" },
      { value: "27086", label: "Pedapudi" },
      { value: "27167", label: "Pedavadlapudi" },
      { value: "27405", label: "Pedda Aravidu" },
      { value: "27021", label: "Pedda Panjani" },
      { value: "26965", label: "Peddamogalai Palli" },
      { value: "26966", label: "Peddapappuru" },
      { value: "27087", label: "Peddapuram" },
      { value: "27366", label: "Pellakuru" },
      { value: "27217", label: "Penagalur Agraharam" },
      { value: "27218", label: "Penagaluru" },
      { value: "27275", label: "Penamaluru" },
      { value: "27219", label: "Pendlimarri" },
      { value: "27553", label: "Pentapadu" },
      { value: "27276", label: "Penuganchiprolu" },
      { value: "27277", label: "Penugolanu" },
      { value: "27554", label: "Penugonda" },
      { value: "26967", label: "Penukonda" },
      { value: "27555", label: "Penumantra" },
      { value: "27022", label: "Penumur" },
      { value: "27556", label: "Peravali" },
      { value: "27168", label: "Phirangipuram" },
      { value: "27023", label: "Pichatur" },
      { value: "27169", label: "Piduguralla" },
      { value: "27024", label: "Pileru" },
      { value: "27088", label: "Pithapuram" },
      { value: "27367", label: "Podalakur" },
      { value: "27406", label: "Podili" },
      { value: "27442", label: "Polaki" },
      { value: "34625", label: "Polavaram" },
      { value: "27089", label: "Pondicherry" },
      { value: "34627", label: "Ponduru" },
      { value: "27170", label: "Ponnekallu" },
      { value: "27171", label: "Ponnur" },
      { value: "27220", label: "Porumamilla" },
      { value: "27557", label: "Pragadavaram" },
      { value: "27397", label: "Prakasam" },
      { value: "34628", label: "Prathipadu" },
      { value: "34629", label: "Prathipadu" },
      { value: "27221", label: "Proddatur" },
      { value: "27025", label: "Pulicherla" },
      { value: "27222", label: "Pulivendula" },
      { value: "27558", label: "Pulla" },
      { value: "27407", label: "Pullala Cheruvu" },
      { value: "27223", label: "Pullampet" },
      { value: "27026", label: "Punganur" },
      { value: "27506", label: "Pusapatirega" },
      { value: "27027", label: "Putalapattu" },
      { value: "26968", label: "Putluru" },
      { value: "26969", label: "Puttaparthi" },
      { value: "27028", label: "Puttur" },
      { value: "27090", label: "Pydipaka" },
      { value: "27408", label: "Racherla" },
      { value: "27091", label: "Rajahmundry" },
      { value: "27224", label: "Rajampet" },
      { value: "27092", label: "Rajanagaram" },
      { value: "27443", label: "Rajapuram" },
      { value: "27093", label: "Rajavommangi" },
      { value: "34636", label: "Rajupalem" },
      { value: "34637", label: "Rajupalem" },
      { value: "27507", label: "Ramabhadrapuram" },
      { value: "34638", label: "Ramachandrapuram" },
      { value: "26970", label: "Ramagiri" },
      { value: "27029", label: "Ramakuppam" },
      { value: "27278", label: "Ramannamodi" },
      { value: "27030", label: "Ramasamudram" },
      { value: "27508", label: "Ramatheertham" },
      { value: "27094", label: "Rampachodavaram" },
      { value: "34640", label: "Ranastalam" },
      { value: "27095", label: "Rangampeta" },
      { value: "26971", label: "Rapthadu" },
      { value: "27368", label: "Rapur" },
      { value: "27096", label: "Ravulapalem" },
      { value: "27225", label: "Rayachoty" },
      { value: "26972", label: "Rayadurgam" },
      { value: "27097", label: "Rayavaram" },
      { value: "34643", label: "Razam" },
      { value: "27098", label: "Razole" },
      { value: "27279", label: "Reddigudem" },
      { value: "27369", label: "Reddypalem" },
      { value: "27031", label: "Renigunta" },
      { value: "27173", label: "Rentachintala" },
      { value: "27174", label: "Repalle" },
      { value: "26973", label: "Roddam" },
      { value: "26974", label: "Rolla" },
      { value: "34647", label: "Rompicherla" },
      { value: "34648", label: "Rompicherla" },
      { value: "27226", label: "S.Mydukur" },
      { value: "27099", label: "Sakhinetipalli" },
      { value: "27444", label: "Salihundam" },
      { value: "27509", label: "Salur" },
      { value: "27100", label: "Samarlakota" },
      { value: "27227", label: "Sambepalli" },
      { value: "34653", label: "Sangam Jagarlamudi" },
      { value: "27317", label: "Sanjamala" },
      { value: "27101", label: "Sankhavaram" },
      { value: "27445", label: "Santhabommali" },
      { value: "27446", label: "Saravakota" },
      { value: "27447", label: "Sarubujjili" },
      { value: "27370", label: "Sarvepalli" },
      { value: "27032", label: "Sathyavedu" },
      { value: "27176", label: "Sattenapalle" },
      { value: "27033", label: "Satyavedu" },
      { value: "27177", label: "Savalyapuram" },
      { value: "27448", label: "Seethampeta" },
      { value: "34659", label: "Seethanagaram" },
      { value: "27372", label: "Seetharamapuram" },
      { value: "26975", label: "Setturu" },
      { value: "27034", label: "Shanthipuram" },
      { value: "27373", label: "Siddanakonduru" },
      { value: "27228", label: "Sidhout" },
      { value: "34666", label: "Sigadam" },
      { value: "27229", label: "Simhadri Puram" },
      { value: "26976", label: "Singanamala" },
      { value: "27409", label: "Singarayakonda" },
      { value: "27449", label: "Sirusuvada" },
      { value: "27318", label: "Sirvella" },
      { value: "27102", label: "Sithanagaram" },
      { value: "26977", label: "Somandepalli" },
      { value: "27559", label: "Somarajuillindalaparru" },
      { value: "27450", label: "Sompeta" },
      { value: "26978", label: "Sreekanthapuram Rural" },
      { value: "27035", label: "Sreerangarajapuram" },
      { value: "27451", label: "Srikakulam" },
      { value: "27036", label: "Srikalahasti" },
      { value: "27037", label: "Srirangarajapuram" },
      { value: "27319", label: "Srisailam" },
      { value: "34675", label: "Srungavarapu kota" },
      { value: "27374", label: "Sullurupeta" },
      { value: "27452", label: "Sumitrapuram" },
      { value: "27560", label: "Surapuram" },
      { value: "27375", label: "Sydapuram" },
      { value: "27230", label: "T. Sundupalli" },
      { value: "27561", label: "T.narasapuram" },
      { value: "27376", label: "Tada" },
      { value: "27377", label: "Tada Khandrika" },
      { value: "27178", label: "Tadepalle" },
      { value: "34679", label: "Tadepalli" },
      { value: "27562", label: "Tadepalligudem" },
      { value: "27563", label: "Tadikalapudi" },
      { value: "27179", label: "Tadikonda" },
      { value: "26979", label: "Tadimarri" },
      { value: "26980", label: "Tadipatri" },
      { value: "27564", label: "Tallapudi" },
      { value: "27103", label: "Tallarevu" },
      { value: "26981", label: "Talupula" },
      { value: "26982", label: "Tanakallu" },
      { value: "27410", label: "Tanguturu" },
      { value: "27565", label: "Tanuku" },
      { value: "27411", label: "Tarlupadu" },
      { value: "27104", label: "Tatipaka" },
      { value: "27453", label: "Tekkali" },
      { value: "27280", label: "Telaprolu" },
      { value: "27180", label: "Tenali" },
      { value: "34690", label: "Therlam" },
      { value: "27038", label: "Thondamanadu" },
      { value: "27231", label: "Thondur" },
      { value: "27378", label: "Thotapalli Gudur" },
      { value: "27281", label: "Thotlavalluru" },
      { value: "27181", label: "Thullur" },
      { value: "34694", label: "Tirupati" },
      { value: "27282", label: "Tiruvuru" },
      { value: "27105", label: "Tondangi" },
      { value: "27106", label: "Torredu" },
      { value: "27412", label: "Tripuranthakam" },
      { value: "27182", label: "Tsunduru" },
      { value: "27320", label: "Tuggali" },
      { value: "27107", label: "Tuni" },
      { value: "27283", label: "Turakapalem" },
      { value: "27183", label: "Turumella" },
      { value: "27379", label: "Udayagiri" },
      { value: "27566", label: "Undarajavaram" },
      { value: "27567", label: "Undi" },
      { value: "34698", label: "Unguturu" },
      { value: "27108", label: "Uppalaguptam" },
      { value: "26983", label: "Uravakonda" },
      { value: "27109", label: "Vaadaparru" },
      { value: "27039", label: "Vadamalapet" },
      { value: "26984", label: "Vajrakarur" },
      { value: "27454", label: "Vajrapukotturu" },
      { value: "27380", label: "Vakadu" },
      { value: "27232", label: "Vallur" },
      { value: "27455", label: "Vandrangi" },
      { value: "34704", label: "Vangara" },
      { value: "34705", label: "Vangara" },
      { value: "27040", label: "Varadaiahpalem" },
      { value: "27381", label: "Varikuntapadu" },
      { value: "27284", label: "Vatsavai" },
      { value: "27041", label: "Vayalpadu" },
      { value: "27568", label: "Vedullakunta" },
      { value: "27042", label: "Vedurukuppam" },
      { value: "27233", label: "Veeraballi" },
      { value: "27456", label: "Veeraghattam" },
      { value: "27285", label: "Veeravalli" },
      { value: "27569", label: "Veeravasaram" },
      { value: "27286", label: "Veerullapadu" },
      { value: "27184", label: "Veldhurthy" },
      { value: "27321", label: "Veldurthi" },
      { value: "27570", label: "Velivennu" },
      { value: "27185", label: "Vellaturu" },
      { value: "27322", label: "Velugodu" },
      { value: "27234", label: "Vempalli" },
      { value: "27186", label: "Vemuru" },
      { value: "27043", label: "Venkata Krishna Puram" },
      { value: "27457", label: "Venkata Rangaraya Puram" },
      { value: "27382", label: "Venkatachalam" },
      { value: "27383", label: "Venkatagiri" },
      { value: "27044", label: "Venkatagirikota" },
      { value: "27511", label: "Venkatakrishnaraja Puram" },
      { value: "34707", label: "Vepada" },
      { value: "27413", label: "Vetapalem" },
      { value: "26985", label: "Vidapanakal" },
      { value: "27384", label: "Vidavalur" },
      { value: "27045", label: "Vijayapuram" },
      { value: "27572", label: "Vijayarai" },
      { value: "34708", label: "Vijayawada" },
      { value: "27385", label: "Vinjamur" },
      { value: "27187", label: "Vinukonda" },
      { value: "27386", label: "Viroor" },
      { value: "27475", label: "Visakhapatnam" },
      { value: "27287", label: "Visakhapatnam Port" },
      { value: "27288", label: "Vissannapetaa" },
      { value: "27510", label: "Vizianagaram" },
      { value: "27414", label: "Voletivaripalem" },
      { value: "27235", label: "Vontimitta" },
      { value: "27289", label: "Vuyyuru" },
      { value: "27529", label: "West Godavari" },
      { value: "27110", label: "Y .ramavaram" },
      { value: "27046", label: "Yadamari" },
      { value: "26986", label: "Yadiki" },
      { value: "27236", label: "Yearraguntla" },
      { value: "27111", label: "Yeleswaram" },
      { value: "34713", label: "Yellamanchili" },
      { value: "34714", label: "Yellanur" },
      { value: "27323", label: "Yemmiganur" },
      { value: "27047", label: "Yerpadu" },
      { value: "27415", label: "Yerragondapalem" },
      { value: "27237", label: "Yerraguntla" },
      { value: "27048", label: "Yerravaripalem" },
    ],
  },
  "27573": { label: "Arunachal Pradesh", cities: [{ value: "27594", label: "Alinye" }, { value: "27595", label: "Anelih" }, { value: "27596", label: "Anini" }, { value: "27575", label: "Anjaw" }, { value: "27679", label: "Bomdila" }, { value: "27680", label: "Dirang" }, { value: "34521", label: "Itanagar" }, { value: "27648", label: "Tawang" }, { value: "27618", label: "Tezu" }, { value: "34400", label: "Ziro" }] },
  "27718": { label: "Assam", cities: [{ value: "34512", label: "Guwahati" }, { value: "27724", label: "Barpeta" }, { value: "27749", label: "Bongaigaon" }, { value: "27811", label: "Dibrugarh" }, { value: "44877", label: "Dispur" }, { value: "27838", label: "Jorhat" }, { value: "27884", label: "Kokrajhar" }, { value: "27895", label: "Lakhimpur" }, { value: "34606", label: "North Lakhimpur" }, { value: "34668", label: "Silchar" }, { value: "28052", label: "Tezpur" }, { value: "28064", label: "Tinsukia" }] },
  "28070": { label: "Bihar", cities: [{ value: "28305", label: "Patna" }, { value: "28096", label: "Begusarai" }, { value: "28101", label: "Bhagalpur" }, { value: "28123", label: "Buxar" }, { value: "28132", label: "Darbhanga" }, { value: "28160", label: "Gaya" }, { value: "28174", label: "Gopalganj" }, { value: "28204", label: "Katihar" }, { value: "28209", label: "Kishanganj" }, { value: "28213", label: "Lakhisarai" }, { value: "28216", label: "Madhepura" }, { value: "28228", label: "Madhubani" }, { value: "28246", label: "Asharganj" }, { value: "28253", label: "Muzaffarpur" }, { value: "28272", label: "Nalanda" }, { value: "28290", label: "Nawada" }, { value: "28312", label: "Purnea" }, { value: "28336", label: "Saharsa" }, { value: "28346", label: "Samastipur" }, { value: "28370", label: "Saran" }, { value: "28397", label: "Sitamarhi" }, { value: "28408", label: "Siwan" }, { value: "28417", label: "Supaul" }, { value: "28440", label: "Vaishali" }, { value: "28448", label: "Bettiah" }] },
  "28449": { label: "Chandigarh", cities: [{ value: "28452", label: "Chandigarh" }] },
  "28455": { label: "Chhattisgarh", cities: [{ value: "28590", label: "Raipur" }, { value: "28457", label: "Balod" }, { value: "28459", label: "Baloda Bazar" }, { value: "28463", label: "Bastar" }, { value: "28471", label: "Bijapur" }, { value: "28479", label: "Bilaspur" }, { value: "28490", label: "Dantewada" }, { value: "28492", label: "Dhamtari" }, { value: "28498", label: "Durg" }, { value: "28511", label: "Gariaband" }, { value: "28518", label: "Janjgir" }, { value: "28528", label: "Jashpur" }, { value: "28537", label: "Kanker" }, { value: "28540", label: "Kondagaon" }, { value: "28547", label: "Korba" }, { value: "28558", label: "Koriya" }, { value: "28563", label: "Mahasamund" }, { value: "28575", label: "Mungeli" }, { value: "28577", label: "Narayanpur" }, { value: "28583", label: "Raigarh" }, { value: "28624", label: "Rajnandgaon" }, { value: "28631", label: "Sukma" }, { value: "28633", label: "Surajpur" }, { value: "28637", label: "Surguja" }] },
  "28644": { label: "Dadra And Nagar Haveli", cities: [{ value: "28646", label: "Dadra and Nagar Haveli" }, { value: "28647", label: "Dharampur" }, { value: "28648", label: "Killa-pardi" }, { value: "28649", label: "Silvassa" }] },
  "28650": { label: "Daman And Diu", cities: [{ value: "28652", label: "Daman" }, { value: "28654", label: "Diu" }] },
  "28655": { label: "Delhi", cities: [{ value: "28657", label: "Central Delhi" }, { value: "28659", label: "East Delhi" }, { value: "28661", label: "New Delhi" }, { value: "28663", label: "North Delhi" }, { value: "28665", label: "North East Delhi" }, { value: "28667", label: "North West Delhi" }, { value: "28669", label: "Shahdara" }, { value: "28671", label: "South Delhi" }, { value: "28673", label: "South East Delhi" }, { value: "28675", label: "South West Delhi" }, { value: "28677", label: "West Delhi" }] },
  "28678": { label: "Goa", cities: [{ value: "28680", label: "Aradi Socorro" }, { value: "28681", label: "Bardez" }, { value: "28682", label: "Bicholim" }, { value: "28689", label: "Canacona" }, { value: "28690", label: "Curchorem" }, { value: "28683", label: "Mapusa" }, { value: "44879", label: "Margao" }, { value: "28691", label: "Mormugao" }, { value: "44880", label: "Old Goa" }, { value: "28684", label: "Panjim" }, { value: "28685", label: "Pernem" }, { value: "34626", label: "Ponda" }, { value: "28692", label: "Quepem" }, { value: "28693", label: "Salcete" }, { value: "28686", label: "Salvador do Mundo" }, { value: "28694", label: "Sanguem" }, { value: "28695", label: "Sanquelim" }, { value: "28687", label: "Satari" }, { value: "34695", label: "Tiswadi" }, { value: "44878", label: "Vasco Da Gama" }, { value: "28696", label: "Vodlemol Cacora" }] },
  "28697": { label: "Gujarat", cities: [{ value: "28699", label: "Ahmedabad" }, { value: "28709", label: "Amreli" }, { value: "28719", label: "Anand" }, { value: "28726", label: "Aravalli" }, { value: "28749", label: "Bharuch" }, { value: "28753", label: "Bhavnagar" }, { value: "28814", label: "Bhuj" }, { value: "28767", label: "Botad" }, { value: "28769", label: "Chhota Udepur" }, { value: "28771", label: "Dahod" }, { value: "28780", label: "Dangs (Ahwa)" }, { value: "28782", label: "Devbhoomi Dwarka" }, { value: "28784", label: "Gandhinagar" }, { value: "28786", label: "Gir Somnath" }, { value: "28790", label: "Jamnagar" }, { value: "28803", label: "Junagadh" }, { value: "28816", label: "Kachchh" }, { value: "28828", label: "Kheda" }, { value: "28839", label: "Mahisagar" }, { value: "28845", label: "Mehsana" }, { value: "28851", label: "Morbi" }, { value: "28853", label: "Narmada (Rajpipla)" }, { value: "28863", label: "Navsari" }, { value: "28865", label: "Panchmahal (Godhra)" }, { value: "28879", label: "Patan" }, { value: "28885", label: "Porbandar" }, { value: "28891", label: "Rajkot" }, { value: "28907", label: "Sabarkantha (Himmatnagar)" }, { value: "28925", label: "Surat" }, { value: "28939", label: "Surendranagar" }, { value: "28949", label: "Vadodara" }, { value: "28967", label: "Valsad" }] },
  "28972": { label: "Haryana", cities: [{ value: "28974", label: "Ambala" }, { value: "28982", label: "Bhiwani" }, { value: "28991", label: "Charkhi Dadri" }, { value: "28994", label: "Faridabad" }, { value: "28999", label: "Fatehabad" }, { value: "29007", label: "Gurugram" }, { value: "29026", label: "Hisar" }, { value: "29028", label: "Jhajjar" }, { value: "29035", label: "Jind" }, { value: "29040", label: "Kaithal" }, { value: "29050", label: "Karnal" }, { value: "29058", label: "Kurukshetra" }, { value: "29067", label: "Mahendragarh" }, { value: "29171", label: "Mewat" }, { value: "29173", label: "Palwal" }, { value: "29175", label: "Panchkula" }, { value: "29179", label: "Panipat" }, { value: "29182", label: "Rewari" }, { value: "29272", label: "Rohtak" }, { value: "29277", label: "Sirsa" }, { value: "29291", label: "Sonipat" }, { value: "29293", label: "Yamuna Nagar" }] },
  "29297": { label: "Himachal Pradesh", cities: [{ value: "29418", label: "Amb" }, { value: "29299", label: "Bilaspur" }, { value: "29308", label: "Chamba" }, { value: "29333", label: "Kangra" }, { value: "29353", label: "Kinnaur" }, { value: "29360", label: "Kullu" }, { value: "29365", label: "Lahaul and Spiti" }, { value: "29373", label: "Mandi" }, { value: "29414", label: "Nalagarh" }, { value: "29402", label: "Nahan" }, { value: "29392", label: "Shimla" }, { value: "29407", label: "Sirmaur (Sirmour)" }, { value: "29416", label: "Solan" }, { value: "29421", label: "Una" }] },
  "29424": { label: "Jammu and Kashmir", cities: [{ value: "29543", label: "Jammu" }, { value: "29618", label: "Srinagar" }, { value: "29429", label: "Anantnag" }, { value: "29487", label: "Baramulla" }, { value: "29502", label: "Budgam" }, { value: "29533", label: "Doda" }, { value: "29538", label: "Ganderbal" }, { value: "29554", label: "Kathua" }, { value: "29556", label: "Kishtwar" }, { value: "29558", label: "Kulgam" }, { value: "29560", label: "Kupwara" }, { value: "29575", label: "Poonch" }, { value: "29577", label: "Pulwama" }, { value: "29603", label: "Rajouri" }, { value: "29606", label: "Ramban" }, { value: "29608", label: "Reasi" }, { value: "29610", label: "Samba" }, { value: "29612", label: "Shopian" }, { value: "29642", label: "Udhampur" }] },
  "29647": { label: "Jharkhand", cities: [{ value: "29819", label: "Ranchi" }, { value: "29650", label: "Bokaro" }, { value: "29661", label: "Chatra" }, { value: "29674", label: "Deoghar" }, { value: "29685", label: "Dhanbad" }, { value: "29689", label: "Dumka" }, { value: "29718", label: "East Singhbhum" }, { value: "29724", label: "Garhwa" }, { value: "29734", label: "Giridih" }, { value: "29741", label: "Godda" }, { value: "29752", label: "Gumla" }, { value: "29766", label: "Hazaribag" }, { value: "29769", label: "Jamtara" }, { value: "29774", label: "Khunti" }, { value: "29778", label: "Koderma" }, { value: "29784", label: "Latehar" }, { value: "29788", label: "Lohardaga" }, { value: "29793", label: "Pakur" }, { value: "29797", label: "Palamu" }, { value: "29809", label: "Ramgarh" }, { value: "29837", label: "Sahibganj" }, { value: "29861", label: "Simdega" }, { value: "29874", label: "West Singhbhum" }] },
  "29881": { label: "Karnataka", cities: [{ value: "35207", label: "Bengaluru" }, { value: "29884", label: "Bagalkot" }, { value: "29892", label: "Ballari" }, { value: "29906", label: "Belagavi" }, { value: "29921", label: "Bengaluru Rural" }, { value: "29923", label: "Bengaluru Urban" }, { value: "29933", label: "Bidar" }, { value: "29936", label: "Bidar" }, { value: "29940", label: "Chamarajanagar" }, { value: "29950", label: "Chickmagaluru" }, { value: "29963", label: "Challakere" }, { value: "29964", label: "Chitradurga" }, { value: "29974", label: "Dakshina Kannada" }, { value: "29976", label: "Davangere" }, { value: "29981", label: "Dharwad" }, { value: "29989", label: "Gadag" }, { value: "30003", label: "Hassan" }, { value: "30008", label: "Haveri" }, { value: "30021", label: "Gulbarga" }, { value: "30025", label: "Kalaburagi (Gulbarga)" }, { value: "30032", label: "Kolar" }, { value: "30047", label: "Koppal" }, { value: "30054", label: "Mandya" }, { value: "29972", label: "Mangaluru" }, { value: "34915", label: "Mysuru" }, { value: "29928", label: "Nelamangala" }, { value: "30077", label: "Raichur" }, { value: "30083", label: "Ramanagara" }, { value: "30086", label: "Shimoga" }, { value: "30109", label: "Udupi" }, { value: "30127", label: "Vijayapura" }, { value: "30135", label: "Yadgir" }] },
  "30137": { label: "Kerala", cities: [{ value: "30139", label: "Alappuzha" }, { value: "30155", label: "Aluva" }, { value: "30185", label: "Kasaragod" }, { value: "30157", label: "Ernakulam" }, { value: "30169", label: "Idukki" }, { value: "30176", label: "Kannur" }, { value: "30188", label: "Kollam" }, { value: "30160", label: "Kochi" }, { value: "30196", label: "Kottayam" }, { value: "30216", label: "Kozhikode" }, { value: "30223", label: "Malappuram" }, { value: "30242", label: "Palakkad" }, { value: "30246", label: "Pathanamthitta" }, { value: "30260", label: "Thrissur" }, { value: "30193", label: "Thiruvananthapuram" }, { value: "30278", label: "Wayanad" }] },
  "177104": { label: "Ladakh", cities: [{ value: "177107", label: "Dras" }, { value: "177111", label: "Hunder" }, { value: "177108", label: "Kargil" }, { value: "177112", label: "Khalsi" }, { value: "177113", label: "Ladakh" }, { value: "177114", label: "Leh" }, { value: "177115", label: "Len" }, { value: "177116", label: "Nobra" }, { value: "177109", label: "Sankoo" }, { value: "177110", label: "Zanskar" }] },
  "30279": { label: "Lakshadweep", cities: [{ value: "30281", label: "Amini" }, { value: "30282", label: "Kiltan Island" }, { value: "30283", label: "Lakshadweep" }] },
  "30284": { label: "Madhya Pradesh", cities: [{ value: "30330", label: "Bhopal" }, { value: "30402", label: "Indore" }, { value: "30406", label: "Jabalpur" }, { value: "30507", label: "Sagar" }, { value: "30524", label: "Satna" }, { value: "30549", label: "Shahdol" }, { value: "30552", label: "Shajapur" }, { value: "30587", label: "Sidhi" }, { value: "30591", label: "Singrauli" }, { value: "30601", label: "Ujjain" }, { value: "30623", label: "Vidisha" }, { value: "30286", label: "Agar Malwa" }, { value: "30288", label: "Alirajpur" }, { value: "30290", label: "Anuppur" }, { value: "30294", label: "Ashoknagar" }, { value: "30300", label: "Balaghat" }, { value: "30310", label: "Barwani" }, { value: "30316", label: "Betul" }, { value: "30321", label: "Bhind" }, { value: "30332", label: "Burhanpur" }, { value: "30335", label: "Chhatarpur" }, { value: "30341", label: "Chhindwara" }, { value: "30355", label: "Damoh" }, { value: "30364", label: "Datia" }, { value: "30369", label: "Dewas" }, { value: "30375", label: "Dhar" }, { value: "30380", label: "Dindori" }, { value: "30383", label: "Guna" }, { value: "30390", label: "Gwalior" }, { value: "30393", label: "Harda" }, { value: "30396", label: "Hoshangabad" }, { value: "30412", label: "Jhabua" }, { value: "30418", label: "Katni" }, { value: "30422", label: "Khandwa" }, { value: "30429", label: "Khargone" }, { value: "30436", label: "Mandla" }, { value: "30444", label: "Mandsaur" }, { value: "30452", label: "Morena" }, { value: "30457", label: "Narsinghpur" }, { value: "30465", label: "Neemuch" }, { value: "30467", label: "Panna" }, { value: "30498", label: "Ratlam" }, { value: "30502", label: "Rewa" }, { value: "30580", label: "Shivpuri" }, { value: "30573", label: "Sheopur" }, { value: "30593", label: "Tikamgarh" }, { value: "30616", label: "Umaria" }] },
  "30624": { label: "Maharashtra", cities: [{ value: "35033", label: "Mumbai" }, { value: "30664", label: "Aurangabad" }, { value: "30626", label: "Ahmednagar" }, { value: "30641", label: "Akola" }, { value: "30650", label: "Amravati" }, { value: "30686", label: "Bhandara" }, { value: "30674", label: "Beed" }, { value: "30716", label: "Chandrapur" }, { value: "30734", label: "Dhule" }, { value: "30741", label: "Gadchiroli" }, { value: "30752", label: "Gondia" }, { value: "30757", label: "Hingoli" }, { value: "30769", label: "Jalgaon" }, { value: "30778", label: "Jalna" }, { value: "30784", label: "Kolhapur" }, { value: "30802", label: "Latur" }, { value: "30806", label: "Mumbai Suburban" }, { value: "30826", label: "Nanded" }, { value: "30845", label: "Nandurbar" }, { value: "30852", label: "Nashik" }, { value: "30863", label: "Osmanabad" }, { value: "30873", label: "Parbhani" }, { value: "30880", label: "Pune" }, { value: "30904", label: "Alibag" }, { value: "30916", label: "Raigad" }, { value: "30920", label: "Ratnagiri" }, { value: "30942", label: "Sangli" }, { value: "30949", label: "Satara" }, { value: "30966", label: "Sindhudurg" }, { value: "30985", label: "Solapur" }, { value: "30988", label: "Thane" }, { value: "30976", label: "Akkalkot" }, { value: "31004", label: "Hinganghat" }, { value: "31009", label: "Wardha" }, { value: "31011", label: "Washim" }, { value: "31014", label: "Yavatmal" }] },
  "31026": { label: "Manipur", cities: [{ value: "34862", label: "Imphal" }, { value: "34406", label: "Bishnupur" }, { value: "31032", label: "Chandel" }, { value: "31034", label: "Churachandpur" }, { value: "31028", label: "Imphal East" }, { value: "31036", label: "Imphal West" }, { value: "31039", label: "Jiribam" }, { value: "31041", label: "Kakching" }, { value: "31043", label: "Kamjong" }, { value: "31045", label: "Kangpokpi" }, { value: "31047", label: "Noney" }, { value: "31049", label: "Pherzawl" }, { value: "31051", label: "Senapati" }, { value: "31053", label: "Tamenglong" }, { value: "31055", label: "Tengnoupal" }, { value: "31030", label: "Thoubal" }, { value: "31057", label: "Ukhrul" }] },
  "31058": { label: "Meghalaya", cities: [{ value: "31084", label: "Shillong" }, { value: "31060", label: "Dambo Rongjeng" }, { value: "31061", label: "Dudnai" }, { value: "31065", label: "Khliehriat" }, { value: "31066", label: "Lad Rymbai" }, { value: "31071", label: "East Khasi Hills" }, { value: "31088", label: "North Garo Hills" }, { value: "31097", label: "Baghmara" }, { value: "31104", label: "Ampati" }, { value: "31114", label: "Tura" }, { value: "31116", label: "Amlarem" }, { value: "31117", label: "Jowai" }, { value: "31120", label: "Mairang" }, { value: "31121", label: "Mawkyrwat" }, { value: "31122", label: "Nongstoin" }] },
  "31123": { label: "Mizoram", cities: [{ value: "31126", label: "Aizawl" }, { value: "31125", label: "Aibawk" }, { value: "31137", label: "Champhai" }, { value: "31143", label: "Kolasib" }, { value: "31150", label: "Lawngtlai" }, { value: "31155", label: "Lunglei" }, { value: "31162", label: "Mamit" }, { value: "31171", label: "Serchhip" }, { value: "31168", label: "Siaha" }] },
  "31172": { label: "Nagaland", cities: [{ value: "31182", label: "Kohima" }, { value: "31176", label: "Dimapur" }, { value: "31179", label: "Kiphire" }, { value: "31186", label: "Longleng" }, { value: "31192", label: "Mokokchung" }, { value: "31199", label: "Mon" }, { value: "31204", label: "Peren" }, { value: "31209", label: "Phek" }, { value: "31216", label: "Tuensang" }, { value: "31220", label: "Wokha" }, { value: "31226", label: "Zunheboto" }] },
  "31227": { label: "Odisha", cities: [{ value: "34451", label: "Bhubaneswar" }, { value: "31229", label: "Angul" }, { value: "31242", label: "Balangir" }, { value: "31252", label: "Balasore" }, { value: "31270", label: "Bargarh" }, { value: "31285", label: "Bhadrak" }, { value: "31298", label: "Boudh" }, { value: "31308", label: "Cuttack" }, { value: "31329", label: "Dhenkanal" }, { value: "31351", label: "Gajapati" }, { value: "31356", label: "Ganjam" }, { value: "34522", label: "Jagatsinghpur" }, { value: "31391", label: "Jajpur" }, { value: "31394", label: "Jajapur" }, { value: "31399", label: "Jharsuguda" }, { value: "31418", label: "Kalahandi" }, { value: "31421", label: "Kandhamal" }, { value: "31445", label: "Kendrapara" }, { value: "31458", label: "Keonjhar" }, { value: "31471", label: "Khordha" }, { value: "31480", label: "Koraput" }, { value: "31493", label: "Malkangiri" }, { value: "31513", label: "Nabarangapur" }, { value: "31524", label: "Nayagarh" }, { value: "31532", label: "Nuapara" }, { value: "31543", label: "Rayagada" }, { value: "31552", label: "Sambalpur" }, { value: "31536", label: "Puri" }, { value: "34677", label: "Sundargarh" }] },
  "31606": { label: "Puducherry", cities: [{ value: "31621", label: "Puducherry" }, { value: "31608", label: "Karaikal" }, { value: "31617", label: "Mahe" }, { value: "31624", label: "Yanam" }] },
  "31626": { label: "Punjab", cities: [{ value: "31629", label: "Amritsar" }, { value: "31661", label: "Barnala" }, { value: "31665", label: "Bathinda" }, { value: "31674", label: "Faridkot" }, { value: "31680", label: "Fatehgarh Sahib" }, { value: "31682", label: "Fazilka" }, { value: "31684", label: "Firozpur" }, { value: "31689", label: "Gurdaspur" }, { value: "31695", label: "Hoshiarpur" }, { value: "31698", label: "Jalandhar" }, { value: "31704", label: "Kapurthala" }, { value: "31708", label: "Ludhiana" }, { value: "31712", label: "Mansa" }, { value: "31718", label: "Moga" }, { value: "31724", label: "Mohali" }, { value: "31731", label: "Muktsar" }, { value: "31739", label: "Pathankot" }, { value: "31741", label: "Patiala" }, { value: "31754", label: "Rupnagar" }, { value: "31762", label: "Sangrur" }, { value: "31764", label: "Tarn Taran" }, { value: "31744", label: "Zirakpur" }] },
  "31766": { label: "Rajasthan", cities: [{ value: "31889", label: "Jaipur" }, { value: "31768", label: "Ajmer" }, { value: "31779", label: "Alwar" }, { value: "31789", label: "Banswara" }, { value: "31791", label: "Baran" }, { value: "31794", label: "Barmer" }, { value: "31817", label: "Bharatpur" }, { value: "31829", label: "Bhilwara" }, { value: "31832", label: "Bikaner" }, { value: "31839", label: "Bundi" }, { value: "31861", label: "Churu" }, { value: "31868", label: "Dausa" }, { value: "31872", label: "Dholpur" }, { value: "31877", label: "Dungarpur" }, { value: "31882", label: "Hanumangarh" }, { value: "31891", label: "Jaisalmer" }, { value: "31900", label: "Jalore" }, { value: "31905", label: "Jhalawar" }, { value: "31910", label: "Jhunjhunu" }, { value: "31921", label: "Jodhpur" }, { value: "31940", label: "Karauli" }, { value: "31945", label: "Kota" }, { value: "31950", label: "Nagaur" }, { value: "31967", label: "Pali" }, { value: "31972", label: "Pratapgarh" }, { value: "31975", label: "Rajsamand" }, { value: "31989", label: "Sawai Madhopur" }, { value: "31995", label: "Sikar" }, { value: "32003", label: "Sirohi" }, { value: "32008", label: "Sri Ganganagar" }, { value: "32017", label: "Tonk" }, { value: "32030", label: "Udaipur" }] },
  "32032": { label: "Sikkim", cities: [{ value: "32035", label: "Gangtok" }, { value: "32043", label: "Chungthang" }, { value: "32050", label: "Geyzing" }, { value: "32044", label: "Mangan" }, { value: "32047", label: "Namchi" }, { value: "32036", label: "Pakyong" }, { value: "32037", label: "Rangpo" }] },
  "32052": { label: "Tamil Nadu", cities: [{ value: "32059", label: "Chennai" }, { value: "32054", label: "Ariyalur" }, { value: "34785", label: "Arani" }, { value: "32062", label: "Anaimalai" }, { value: "32064", label: "Coimbatore" }, { value: "32075", label: "Chidambaram" }, { value: "32077", label: "Cuddalore" }, { value: "32081", label: "Dharmapuri" }, { value: "32087", label: "Dindigul" }, { value: "32095", label: "Erode" }, { value: "32104", label: "Chengalpattu" }, { value: "32105", label: "Kanchipuram" }, { value: "32119", label: "Kanyakumari" }, { value: "32125", label: "Karur" }, { value: "32133", label: "Krishnagiri" }, { value: "32140", label: "Madurai" }, { value: "32152", label: "Nagapattinam" }, { value: "32121", label: "Nagercoil" }, { value: "32158", label: "Namakkal" }, { value: "32169", label: "Nilgiris" }, { value: "32180", label: "Pudukkottai" }, { value: "32173", label: "Perambalur" }, { value: "32197", label: "Ramanathapuram" }, { value: "32202", label: "Salem" }, { value: "32208", label: "Sivaganga" }, { value: "32244", label: "Tiruchirappalli" }, { value: "32253", label: "Tirunelveli" }, { value: "32266", label: "Tiruppur" }, { value: "32269", label: "Tiruvallur" }, { value: "32281", label: "Tiruvannamalai" }, { value: "32286", label: "Tiruvarur" }, { value: "32239", label: "Thoothukudi" }, { value: "32222", label: "Thanjavur" }, { value: "32229", label: "Theni" }, { value: "35215", label: "Villupuram" }, { value: "32313", label: "Virudhunagar" }] },
  "32319": { label: "Telangana", cities: [{ value: "32342", label: "Hyderabad" }, { value: "32321", label: "Adilabad" }, { value: "32322", label: "Asifabad" }, { value: "32340", label: "Bhadradri Kothagudem" }, { value: "32345", label: "Jagtial" }, { value: "32347", label: "Jangaon" }, { value: "32349", label: "Jayashankar Bhoopalpally" }, { value: "32351", label: "Jogulamba Gadwal" }, { value: "32353", label: "Kamareddy" }, { value: "32360", label: "Karimnagar" }, { value: "32343", label: "Saroornagar" }, { value: "32510", label: "Mancherial" }, { value: "32515", label: "Medak" }, { value: "32525", label: "Medchal" }, { value: "32527", label: "Nagarkurnool" }, { value: "32537", label: "Nalgonda" }, { value: "32556", label: "Nirmal" }, { value: "32566", label: "Nizamabad" }, { value: "32574", label: "Peddapalli" }, { value: "32576", label: "Rajanna Sircilla" }, { value: "32579", label: "Rangareddy" }, { value: "32587", label: "Sangareddy" }, { value: "32589", label: "Siddipet" }, { value: "32591", label: "Suryapet" }, { value: "32593", label: "Vikarabad" }, { value: "32595", label: "Wanaparthy" }, { value: "34999", label: "Warangal" }, { value: "32599", label: "Warangal (Urban)" }, { value: "32601", label: "Yadadri Bhuvanagiri" }, { value: "32460", label: "Mahabubabad" }, { value: "32474", label: "Mahbubnagar" }] },
  "32659": { label: "Tripura", cities: [{ value: "35128", label: "Agartala" }, { value: "32661", label: "Chulubari" }, { value: "32677", label: "Gomati" }, { value: "32679", label: "Khowai" }, { value: "32681", label: "Ambassa" }, { value: "32696", label: "Dharmanagar" }, { value: "32731", label: "Sepahijala" }, { value: "32735", label: "Belonia" }, { value: "32747", label: "South Tripura" }, { value: "32749", label: "Unakoti" }, { value: "32763", label: "West Tripura" }] },
  "32784": { label: "Uttar Pradesh", cities: [{ value: "33256", label: "Lucknow" }, { value: "32786", label: "Agra" }, { value: "32795", label: "Aligarh" }, { value: "32799", label: "Allahabad" }, { value: "32829", label: "Ambedkar Nagar" }, { value: "32841", label: "Amethi" }, { value: "32843", label: "Amroha" }, { value: "32850", label: "Auraiya" }, { value: "32854", label: "Azamgarh" }, { value: "32870", label: "Baghpat" }, { value: "32874", label: "Bahraich" }, { value: "32882", label: "Ballia" }, { value: "32891", label: "Balrampur" }, { value: "32893", label: "Banda" }, { value: "32895", label: "Barabanki" }, { value: "32903", label: "Bareilly" }, { value: "32911", label: "Basti" }, { value: "35208", label: "Bhadohi" }, { value: "32920", label: "Bijnor" }, { value: "32927", label: "Badaun" }, { value: "32938", label: "Bulandshahr" }, { value: "32944", label: "Chandauli" }, { value: "32947", label: "Chitrakoot" }, { value: "32952", label: "Deoria" }, { value: "32958", label: "Etah" }, { value: "32967", label: "Etawah" }, { value: "32972", label: "Faizabad" }, { value: "32977", label: "Farrukhabad" }, { value: "32979", label: "Fatehpur" }, { value: "32981", label: "Firozabad" }, { value: "32996", label: "Ghaziabad" }, { value: "33014", label: "Ghazipur" }, { value: "33022", label: "Gonda" }, { value: "33031", label: "Gorakhpur" }, { value: "33040", label: "Hamirpur" }, { value: "33045", label: "Hardoi" }, { value: "33050", label: "Hathras" }, { value: "33052", label: "Jalaun" }, { value: "33057", label: "Jaunpur" }, { value: "33068", label: "Jhansi" }, { value: "33073", label: "Kannauj" }, { value: "33090", label: "Kanpur Nagar" }, { value: "33223", label: "Kanshiram Nagar (Kasganj)" }, { value: "33225", label: "Kaushambi" }, { value: "33235", label: "Kushinagar" }, { value: "33242", label: "Lakhimpur - Kheri" }, { value: "33250", label: "Lalitpur" }, { value: "33262", label: "Maharajganj" }, { value: "33268", label: "Mahoba" }, { value: "33270", label: "Mainpuri" }, { value: "33276", label: "Mathura" }, { value: "33283", label: "Mau" }, { value: "33288", label: "Meerut" }, { value: "33294", label: "Mirzapur" }, { value: "33302", label: "Moradabad" }, { value: "33309", label: "Muzaffarnagar" }, { value: "33318", label: "Pratapgarh" }, { value: "33330", label: "RaeBareli" }, { value: "33339", label: "Rampur" }, { value: "33340", label: "Jafrabad" }, { value: "33349", label: "Saharanpur" }, { value: "33362", label: "Sant Kabir Nagar" }, { value: "33363", label: "Dhan Ghata" }, { value: "33367", label: "Shahjahanpur" }, { value: "33371", label: "Shamali (Prabuddh Nagar)" }, { value: "33373", label: "Siddharth Nagar" }, { value: "33388", label: "Sitapur" }, { value: "33392", label: "Sonbhadra" }, { value: "33401", label: "Sultanpur" }, { value: "33406", label: "Unnao" }, { value: "33409", label: "Varanasi" }] },
  "33411": { label: "Uttarakhand", cities: [{ value: "33413", label: "Almora" }, { value: "33424", label: "Bageshwar" }, { value: "33428", label: "Chamoli" }, { value: "33436", label: "Champawat" }, { value: "33440", label: "Dehradun" }, { value: "33446", label: "Haridwar" }, { value: "33453", label: "Haldwani" }, { value: "33456", label: "Nainital" }, { value: "33462", label: "Pauri" }, { value: "33469", label: "Pithoragarh" }, { value: "34639", label: "Ramnagar" }, { value: "33421", label: "Ranikhet" }, { value: "34645", label: "Rishikesh" }, { value: "33449", label: "Roorkee" }, { value: "33477", label: "Rudraprayag" }, { value: "33498", label: "Rudrapur" }, { value: "33480", label: "Tehri Garhwal" }, { value: "33492", label: "Udham Singh Nagar" }] },
  "33506": { label: "West Bengal", cities: [{ value: "33670", label: "Kolkata" }, { value: "33508", label: "Alipurduar" }, { value: "33513", label: "Bankura" }, { value: "33537", label: "Bardhaman" }, { value: "33564", label: "Birbhum" }, { value: "33578", label: "Cooch Behar" }, { value: "33592", label: "Balurghat" }, { value: "33600", label: "Darjeeling" }, { value: "33629", label: "Hooghly" }, { value: "33649", label: "Howrah" }, { value: "33660", label: "Jalpaiguri" }, { value: "33668", label: "Kalimpong" }, { value: "33674", label: "Malda" }, { value: "33760", label: "Nadia" }, { value: "33779", label: "North 24 Parganas" }, { value: "34337", label: "Purulia" }, { value: "34362", label: "South 24 Parganas" }, { value: "33576", label: "Suri" }, { value: "33506", label: "West Bengal" }, { value: "34073", label: "Paschim Medinipur (West Medinipur)" }, { value: "34182", label: "Purba Medinipur (East Medinipur)" }] },
};

// ─── School → Course mapping (complete) ──────────────────────────────────────
const SCHOOL_COURSE_MAP = {
  "1500062": {
    label: "School of Health Sciences",
    courses: [
      { value: "1500066", label: "B.Sc. Anesthesiology Technology & Operation Technology" },
      { value: "1500067", label: "B.Sc. Renal Dialysis Technology" },
      { value: "1500068", label: "B.Sc. Imaging Technology" },
      { value: "1500069", label: "B.Sc. Physician Assistant" },
      { value: "1500070", label: "B.Sc. Medical Laboratory Technology" },
      { value: "1500273", label: "B.Sc. Clinical Psychology" },
      { value: "1500071", label: "B.Sc. Emergency Medical Technology" },
      { value: "1500072", label: "Bachelor of Optometry (BOPTOM)" },
      { value: "1500073", label: "Bachelor of Occupational Therapy (BOT)" },
      { value: "1500074", label: "B.Sc. Respiratory Therapy Technology" },
      { value: "1500076", label: "B.Sc. Health Psychology" },
      { value: "1500077", label: "B.Sc. Genetics and Molecular Biology" },
      { value: "1500475", label: "B.Sc. Critical Care Technology" },
      { value: "1500207", label: "B.Sc. Bio-Technology" },
      { value: "1500078", label: "Bachelor of Physiotherapy (BPT)" },
      { value: "1500229", label: "Master of Physiotherapy (MPT)" },
      { value: "1500476", label: "Masters in Dialysis Therapy" },
      { value: "1500080", label: "Master of Public Health (MPH)" },
      { value: "1500081", label: "M.Sc. Health Informatics and Analytics" },
      { value: "1500208", label: "M.Sc. Medical Bio-Technology" },
      { value: "1500477", label: "M.Sc. Medical Laboratory Science" },
      { value: "1500079", label: "M.Sc. Clinical Psychology" },
      { value: "1500082", label: "Master of Physiotherapy (MPT) - Orthopaedic" },
      { value: "1500145", label: "Master of Physiotherapy (MPT) - Neurology" },
      { value: "1500216", label: "M.Sc. Medical Imaging Technology" },
      { value: "1500146", label: "Master of Physiotherapy (MPT) - Cardio-Pulmonary" },
      { value: "1500227", label: "P.G. Diploma in Advanced Guidance and Counselling" },
      { value: "1500228", label: "P.G. Diploma in Biostatistics (PGDBS)" },
      { value: "1500226", label: "P.G. Diploma in Sport Psychology" },
    ],
  },
  "1500063": {
    label: "School of Technology (B.Tech)",
    courses: [
      { value: "1500083", label: "B.Tech Computer Science and Engineering (CSE)" },
      { value: "1500084", label: "B.Tech CSE Artificial Intelligence and Data Science (AI&DS)" },
      { value: "1500085", label: "B.Tech CSE Cyber Security (CS)" },
      { value: "1500086", label: "B.Tech CSE Artificial Intelligence and Machine Learning (AI&ML)" },
      { value: "1500482", label: "B.Tech CSE in AI & Healthcare" },
      { value: "1500210", label: "B.Tech Computer Engineering (Cloud Computing)" },
      { value: "1500087", label: "B.Tech Computer Engineering (Software Engineering) - Work Integrated" },
      { value: "1500088", label: "M.Tech VLSI Design & Embedded Systems" },
      { value: "1500212", label: "M.Tech Data Science" },
      { value: "1500211", label: "M.Tech Computer Science and Engineering" },
    ],
  },
  "1500064": {
    label: "School of Management",
    courses: [
      { value: "1500089", label: "MBA in Hospital & Healthcare Management" },
      { value: "1500479", label: "BBA" },
    ],
  },
  "1500065": {
    label: "Apollo Institute of Pharmaceutical Sciences",
    courses: [
      { value: "1500090", label: "Bachelor of Pharmacy" },
      { value: "1500478", label: "PharmD" },
    ],
  },
};

// ─── Simple Captcha Generator ─────────────────────────────────────────────────
function generateCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ─── Component ────────────────────────────────────────────────────────────────
// Props:
//   isOpen  {boolean} - controls visibility (desktop popup / mobile static)
//   onClose {function} - called when the X button is clicked
export default function Form({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    stateId: "",
    stateName: "",
    cityId: "",
    cityName: "",
    schoolId: "",
    schoolName: "",
    courseId: "",
    courseName: "",
  });

  const [captchaText, setCaptchaText] = useState(() => generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Regenerate captcha
  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setCaptchaInput("");
  };

  // Derived lists
  const availableCities = form.stateId ? STATE_CITY_MAP[form.stateId]?.cities ?? [] : [];
  const availableCourses = form.schoolId ? SCHOOL_COURSE_MAP[form.schoolId]?.courses ?? [] : [];

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleStateChange = (e) => {
    const stateId = e.target.value;
    const stateName = stateId ? STATE_CITY_MAP[stateId]?.label ?? "" : "";
    setForm({ ...form, stateId, stateName, cityId: "", cityName: "" });
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    const cityName = cityId ? availableCities.find((c) => c.value === cityId)?.label ?? "" : "";
    setForm({ ...form, cityId, cityName });
  };

  const handleSchoolChange = (e) => {
    const schoolId = e.target.value;
    const schoolName = schoolId ? SCHOOL_COURSE_MAP[schoolId]?.label ?? "" : "";
    setForm({ ...form, schoolId, schoolName, courseId: "", courseName: "" });
  };

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    const courseName = courseId ? availableCourses.find((c) => c.value === courseId)?.label ?? "" : "";
    setForm({ ...form, courseId, courseName });
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (captchaInput.trim() !== captchaText) {
      setError("Captcha does not match. Please try again.");
      refreshCaptcha();
      return;
    }
    if (!agreed) {
      setError("Please agree to receive information before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "students"), {
        ...form,
        submittedAt: new Date().toISOString(),
      });
      alert("Submitted Successfully! We will get in touch with you soon.");
      // Reset
      setForm({ name: "", email: "", phone: "", stateId: "", stateName: "", cityId: "", cityName: "", schoolId: "", schoolName: "", courseId: "", courseName: "" });
      setCaptchaInput("");
      setAgreed(false);
      refreshCaptcha();
      if (onClose) onClose();
    } catch (err) {
      setError("Submission failed. Please try again.");
    }
    setSubmitting(false);
  };

  // ── Styles ────────────────────────────────────────────────────────────────
  const styles = `
    /* ── DESKTOP POPUP ── */
    .tau-form-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 0;
      transition: opacity 0.3s ease;
    }
    .tau-form-overlay.tau-hidden {
      opacity: 0;
      pointer-events: none;
    }
    .tau-form-popup {
      background: #fff;
      width: 340px;
      max-height: 100vh;
      overflow-y: auto;
      box-shadow: -4px 0 24px rgba(0,0,0,0.25);
      display: flex;
      flex-direction: column;
    }
    .tau-form-header {
      background: #1b97b8;
      color: #fff;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    .tau-form-header h2 {
      font-size: 1.15rem;
      font-weight: 700;
      margin: 0;
    }
    .tau-close-btn {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.4rem;
      cursor: pointer;
      line-height: 1;
      padding: 0 4px;
      opacity: 0.85;
      transition: opacity 0.15s;
    }
    .tau-close-btn:hover { opacity: 1; }
    .tau-form-body {
      padding: 16px 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* ── MOBILE STATIC (below hero) ── */
    .tau-form-mobile-static {
      display: none;
      background: #fff;
      padding: 0;
    }
    .tau-form-mobile-static .tau-form-header {
      background: #1b97b8;
      color: #fff;
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .tau-form-mobile-static .tau-form-header h2 {
      font-size: 1.15rem;
      font-weight: 700;
      margin: 0;
    }
    .tau-form-mobile-static .tau-form-body {
      padding: 16px 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    /* ── SHARED INPUT STYLES ── */
    .tau-input,
    .tau-select {
      width: 100%;
      border: 1px solid #d0d0d0;
      border-radius: 0;
      padding: 9px 11px;
      font-size: 0.88rem;
      color: #333;
      background: #fff;
      outline: none;
      transition: border-color 0.15s;
      box-sizing: border-box;
    }
    .tau-input:focus, .tau-select:focus {
      border-color: #1b97b8;
    }
    .tau-input::placeholder { color: #aaa; }
    .tau-select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 28px; }

    /* Phone row */
    .tau-phone-row {
      display: flex;
      gap: 0;
    }
    .tau-phone-prefix {
      flex-shrink: 0;
      border: 1px solid #d0d0d0;
      border-right: none;
      padding: 9px 10px;
      font-size: 0.88rem;
      color: #555;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }
    .tau-phone-prefix select {
      border: none;
      background: transparent;
      font-size: 0.88rem;
      color: #555;
      outline: none;
      cursor: pointer;
    }
    .tau-phone-row .tau-input {
      border-left: none;
      flex: 1;
    }

    /* Row for two selects */
    .tau-row-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    /* Captcha row */
    .tau-captcha-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .tau-captcha-display {
      flex-shrink: 0;
      background: #e8e8e8;
      border: 1px solid #ccc;
      padding: 7px 14px;
      font-family: 'Courier New', monospace;
      font-size: 1.1rem;
      letter-spacing: 4px;
      font-weight: 700;
      color: #333;
      user-select: none;
      text-decoration: line-through;
      text-decoration-color: rgba(0,0,0,0.25);
      min-width: 100px;
      text-align: center;
    }
    .tau-captcha-refresh {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.1rem;
      color: #1b97b8;
      padding: 4px;
      flex-shrink: 0;
      transition: transform 0.3s;
    }
    .tau-captcha-refresh:hover { transform: rotate(180deg); }
    .tau-captcha-row .tau-input {
      flex: 1;
    }

    /* Consent checkbox */
    .tau-consent {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.8rem;
      color: #444;
      line-height: 1.4;
    }
    .tau-consent input[type="checkbox"] {
      margin-top: 2px;
      flex-shrink: 0;
      cursor: pointer;
      accent-color: #1b97b8;
    }

    /* Submit button */
    .tau-submit-btn {
      width: 100%;
      background: #1b97b8;
      color: #fff;
      border: none;
      padding: 12px;
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: 1px;
      cursor: pointer;
      text-transform: uppercase;
      transition: background 0.2s;
      margin-top: 2px;
    }
    .tau-submit-btn:hover:not(:disabled) { background: #167a96; }
    .tau-submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

    /* Error message */
    .tau-error {
      background: #fff3f3;
      border: 1px solid #f8b4b4;
      color: #c0392b;
      padding: 8px 10px;
      font-size: 0.82rem;
      border-radius: 2px;
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 600px) {
      /* Hide desktop popup entirely on mobile */
      .tau-form-overlay {
        display: none !important;
      }
      /* Show mobile static block */
      .tau-form-mobile-static {
        display: block;
      }
    }

    /* ── DESKTOP: hide mobile static ── */
    @media (min-width: 601px) {
      .tau-form-mobile-static {
        display: none !important;
      }
    }
  `;

  // Shared form fields JSX (reused in both popup and mobile static)
  const formFields = (
    <div className="tau-form-body">
      {/* Name */}
      <input
        className="tau-input"
        type="text"
        placeholder="Enter Name *"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      {/* Email */}
      <input
        className="tau-input"
        type="email"
        placeholder="Enter Email Address *"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      {/* Phone with +91 prefix */}
      <div className="tau-phone-row">
        <div className="tau-phone-prefix">
          <span>+91</span>
          <span style={{ fontSize: "0.7rem", color: "#888" }}>▼</span>
        </div>
        <input
          className="tau-input"
          type="tel"
          placeholder="Enter Mobile Number *"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          maxLength={10}
          required
        />
      </div>

      {/* State + City */}
      <div className="tau-row-2">
        <select
          className="tau-select"
          value={form.stateId}
          onChange={handleStateChange}
          required
        >
          <option value="">Select State *</option>
          {Object.entries(STATE_CITY_MAP).map(([value, { label }]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select
          className="tau-select"
          value={form.cityId}
          onChange={handleCityChange}
          disabled={!form.stateId || availableCities.length === 0}
          required
        >
          <option value="">
            {!form.stateId ? "Select State first" : availableCities.length === 0 ? "No cities" : "Select City *"}
          </option>
          {availableCities.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* School + Course */}
      <div className="tau-row-2">
        <select
          className="tau-select"
          value={form.schoolId}
          onChange={handleSchoolChange}
          required
        >
          <option value="">Select School *</option>
          {Object.entries(SCHOOL_COURSE_MAP).map(([value, { label }]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select
          className="tau-select"
          value={form.courseId}
          onChange={handleCourseChange}
          disabled={!form.schoolId || availableCourses.length === 0}
          required
        >
          <option value="">
            {!form.schoolId ? "Select School first" : availableCourses.length === 0 ? "No courses" : "Select Course *"}
          </option>
          {availableCourses.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Captcha */}
      <div className="tau-captcha-row">
        <div className="tau-captcha-display">{captchaText}</div>
        <button
          type="button"
          className="tau-captcha-refresh"
          onClick={refreshCaptcha}
          title="Refresh captcha"
        >
          ↻
        </button>
        <input
          className="tau-input"
          type="text"
          placeholder="Enter Captcha"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
          required
        />
      </div>

      {/* Consent */}
      <label className="tau-consent">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <span>I agree to receive information regarding my submitted enquiry on The Apollo University *</span>
      </label>

      {/* Error */}
      {error && <div className="tau-error">{error}</div>}

      {/* Submit */}
      <button
        type="submit"
        className="tau-submit-btn"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "SUBMIT"}
      </button>
    </div>
  );

  return (
    <>
      <style>{styles}</style>

      {/* ── DESKTOP POPUP (right-side panel, shown/hidden via isOpen) ── */}
      <div className={`tau-form-overlay${isOpen ? "" : " tau-hidden"}`}>
        <div className="tau-form-popup">
          <div className="tau-form-header">
            <h2>Merit Based Admission 2026</h2>
            <button className="tau-close-btn" onClick={onClose}>✕</button>
          </div>
          <form onSubmit={handleSubmit}>
            {formFields}
          </form>
        </div>
      </div>

      {/* ── MOBILE STATIC (always rendered below hero on mobile) ── */}
      <div className="tau-form-mobile-static">
        <div className="tau-form-header">
          <h2>Admission 2026</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {formFields}
        </form>
      </div>
    </>
  );
}