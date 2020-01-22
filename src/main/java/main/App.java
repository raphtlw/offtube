package main;

import java.io.IOException;
import java.util.Scanner;

import com.github.kiulian.downloader.YoutubeDownloader;
import com.github.kiulian.downloader.YoutubeException;
import com.github.kiulian.downloader.model.VideoDetails;
import com.github.kiulian.downloader.model.YoutubeVideo;

/**
 * The main downloader class.
 * Github: TODO:
 * 
 * TODO: Allow user to choose downloading formats without needing itag
 * TODO: Complete downloading function
 */
class App {
    private static Scanner scanner = new Scanner(System.in);
    public static void main(String[] args) throws YoutubeException, IOException {
        // Print the starting screen
        printIntroScreen();
        String videoUrl = scanner.nextLine();
        YoutubeVideo video = getVideo(videoUrl);
        VideoDetails videoDetails = video.details();
        System.out.println("Title: " + videoDetails.title());
        
    }

    private static YoutubeVideo getVideo(String url) throws YoutubeException, IOException {
        YoutubeDownloader youtubeDownloader = new YoutubeDownloader();
        String videoId = url.replaceAll("https://www.youtube.com/watch?v=", "");
        return youtubeDownloader.getVideo(videoId);
    }

    private static void printIntroScreen() {
        System.out.println("\n\n");
        System.out.println("__     __      _______    _                               ");
        System.out.println("\\ \\   / /     |__   __|  | |                              ");
        System.out.println(" \\ \\_/ /__  _   _| |_   _| |__   ___                      ");
        System.out.println("  \\   / _ \\| | | | | | | | '_ \\ / _ \\                     ");
        System.out.println("   | | (_) | |_| | | |_| | |_) |  __/                     ");
        System.out.println(" __|_|\\___/ \\__,_|_|\\__,_|_.__/ \\___|         _           ");
        System.out.println("|  __ \\                    | |               | |          ");
        System.out.println("| |  | | _____      ___ __ | | ___   __ _  __| | ___ _ __ ");
        System.out.println("| |  | |/ _ \\ \\ /\\ / / '_ \\| |/ _ \\ / _` |/ _` |/ _ \\ '__|");
        System.out.println("| |__| | (_) \\ V  V /| | | | | (_) | (_| | (_| |  __/ |   ");
        System.out.println("|_____/ \\___/ \\_/\\_/ |_| |_|_|\\___/ \\__,_|\\__,_|\\___|_|   ");
        System.out.println("\n\n");
    }
}