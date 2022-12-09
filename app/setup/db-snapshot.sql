-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 09 Gru 2022, 13:05
-- Wersja serwera: 10.4.14-MariaDB
-- Wersja PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `af4`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `offers`
--

CREATE TABLE `offers` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `price` int(11) NOT NULL,
  `sale` int(11) DEFAULT NULL,
  `description` text NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `offers`
--

INSERT INTO `offers` (`id`, `name`, `price`, `sale`, `description`, `image`) VALUES
(5, 'Joomla', 0, NULL, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla harum maiores architecto fuga id consequuntur dolore explicabo omnis, accusamus quam, aspernatur, nobis ipsa consequatur necessitatibus qui! Reprehenderit reiciendis iusto laborum natus numquam dolore eveniet culpa quaerat ipsum asperiores voluptatem consequatur, distinctio alias facere consectetur nesciunt soluta perspiciatis provident. Ab, hic.', 'https://place-hold.it/512x512'),
(6, 'Wordpress', 0, NULL, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla harum maiores architecto fuga id consequuntur dolore explicabo omnis, accusamus quam, aspernatur, nobis ipsa consequatur necessitatibus qui! Reprehenderit reiciendis iusto laborum natus numquam dolore eveniet culpa quaerat ipsum asperiores voluptatem consequatur, distinctio alias facere consectetur nesciunt soluta perspiciatis provident. Ab, hic.', 'https://place-hold.it/512x512'),
(7, 'Custom', 0, NULL, 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla harum maiores architecto fuga id consequuntur dolore explicabo omnis, accusamus quam, aspernatur, nobis ipsa consequatur necessitatibus qui! Reprehenderit reiciendis iusto laborum natus numquam dolore eveniet culpa quaerat ipsum asperiores voluptatem consequatur, distinctio alias facere consectetur nesciunt soluta perspiciatis provident. Ab, hic.', 'https://place-hold.it/512x512');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `offers`
--
ALTER TABLE `offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
