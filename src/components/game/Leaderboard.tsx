
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Award, Star } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { gameSession, currentPlayer, returnToLobby } = useGame();

  if (!gameSession || gameSession.players.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>No player data available</p>
        <Button className="mt-4" onClick={returnToLobby}>
          Return to Lobby
        </Button>
      </div>
    );
  }

  // Sort players by score
  const sortedPlayers = [...gameSession.players].sort((a, b) => b.score - a.score);
  
  // Find the top 3 players
  const topPlayers = sortedPlayers.slice(0, 3);

  return (
    <div className="h-full flex flex-col animate-fade-in overflow-hidden">
      <h2 className="text-lg md:text-xl font-bold p-2 text-center sticky top-0 bg-black/80 backdrop-blur-sm z-10">Leaderboard</h2>

      {/* Top Players Podium */}
      <div className="flex justify-center items-end gap-1 md:gap-2 px-2 py-2">
        {topPlayers.length > 1 && (
          <div className="w-16 md:w-20 text-center">
            <div className="h-12 md:h-16 bg-gray-300 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
              <span className="text-sm md:text-base font-bold">{topPlayers[1].score}</span>
            </div>
            <div className="bg-gray-200 dark:bg-gray-800 p-1 md:p-2 rounded-b-lg">
              <p className="text-xs truncate">{topPlayers[1].name}</p>
              <div className="flex justify-center">
                <Star className="h-3 w-3 md:h-4 md:w-4 text-gray-500" />
              </div>
              <p className="text-xs text-muted-foreground">2nd Place</p>
            </div>
          </div>
        )}
        
        {topPlayers.length > 0 && (
          <div className="w-20 md:w-28 text-center">
            <div className="h-16 md:h-24 bg-yellow-300 dark:bg-yellow-600 rounded-t-lg flex items-center justify-center p-1">
              <Award className="h-4 w-4 md:h-6 md:w-6 text-yellow-600 dark:text-yellow-300" />
              <span className="text-lg md:text-2xl font-bold ml-1">{topPlayers[0].score}</span>
            </div>
            <div className="bg-yellow-200 dark:bg-yellow-800 p-1 md:p-2 rounded-b-lg">
              <p className="text-xs md:text-sm font-bold truncate">{topPlayers[0].name}</p>
              <div className="flex justify-center">
                <Star className="h-3 w-3 md:h-4 md:w-4 text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-xs text-muted-foreground">1st Place</p>
            </div>
          </div>
        )}
        
        {topPlayers.length > 2 && (
          <div className="w-14 md:w-20 text-center">
            <div className="h-10 md:h-12 bg-amber-300 dark:bg-amber-700 rounded-t-lg flex items-center justify-center">
              <span className="text-sm md:text-base font-bold">{topPlayers[2].score}</span>
            </div>
            <div className="bg-amber-200 dark:bg-amber-800 p-1 md:p-2 rounded-b-lg">
              <p className="text-2xs md:text-xs truncate">{topPlayers[2].name}</p>
              <div className="flex justify-center">
                <Star className="h-2 w-2 md:h-3 md:w-3 text-amber-500" />
              </div>
              <p className="text-xs text-muted-foreground">3rd Place</p>
            </div>
          </div>
        )}
      </div>

      {/* Complete Scoreboard */}
      <div className="flex-1 overflow-y-auto">
        <Card className="mx-2 mb-2">
          <Table className="text-xs md:text-sm">
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead className="w-10 p-2">#</TableHead>
                <TableHead className="p-2">Player</TableHead>
                <TableHead className="text-right p-2 w-16">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedPlayers.map((player, index) => (
                <TableRow 
                  key={player.id} 
                  className={`h-10 ${player.id === currentPlayer?.id ? 'font-bold bg-primary/10' : ''}`}
                >
                  <TableCell className="p-2 w-10">{index + 1}</TableCell>
                  <TableCell className="p-2 truncate max-w-[100px] md:max-w-[200px]">
                    <span className="truncate">{player.name}</span>
                  </TableCell>
                  <TableCell className="text-right p-2 w-16 font-mono">{player.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Actions */}
      <div className="p-2 text-center border-t border-gray-700">
        <Button 
          onClick={returnToLobby} 
          size="sm"
          variant="outline"
          className="w-full max-w-xs"
        >
          Return to Lobby
        </Button>
      </div>
    </div>
  );
};

export default Leaderboard;
