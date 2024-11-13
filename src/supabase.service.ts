import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = new SupabaseClient('https://ffenhqwkmshxesotaasr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmZW5ocXdrbXNoeGVzb3RhYXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3NDYzNDIsImV4cCI6MjA0MzMyMjM0Mn0.HmDb8ECrOzNbU6shMKlS6V1sjUsNCPJiKbu1vd_Vi4M'

    );
  }

  async findUserByUsername(username: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async createUser(createUserDto: CreateUserDto, hashedPassword: string): Promise<any> {
    const { username, email } = createUserDto;
    const { data, error } = await this.supabase
      .from('users')
      .insert([{ username, email, password: hashedPassword }]);

    if (error) throw new Error(error.message);
    return data[0];
  }
}
