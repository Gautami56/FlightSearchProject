describe('Testing the functionality, this is the checklist', ()=>{
    it('should convert date', ()=>{
        var item = "2021/02/1"
      const result = convertDate(item)
      console.log('resultttt', result)
      expect(result).toBe("Mon Feb 01 2021");
    })
  })
